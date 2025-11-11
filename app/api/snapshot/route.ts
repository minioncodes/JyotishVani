import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0;


const userCache = new Map<string, { data: any; timestamp: number }>();


const CACHE_TTL = 12 * 60 * 60 * 1000;

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    console.log("Using cached token until", new Date(tokenExpiry).toLocaleTimeString());
    return cachedToken;
  }

  console.log("Fetching new Prokerala token...");
  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID || "",
      client_secret: process.env.PROKERALA_CLIENT_SECRET || "",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Token fetch failed:", res.status, text);
    throw new Error(`Token fetch failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000;
  console.log("Token cached until", new Date(tokenExpiry).toLocaleTimeString());
  return cachedToken;
}

function isNowBetween(start: string, end: string): boolean {
  const now = new Date();
  return now >= new Date(start) && now <= new Date(end);
}

// ---------- MAIN HANDLER ----------
export async function GET(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown-user";

    const now = Date.now();


    const cached = userCache.get(ip);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      console.log(`Serving cached snapshot for ${ip}`);
      return NextResponse.json(cached.data, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    console.log(`No valid cache for ${ip}, fetching fresh snapshot...`);

    const token = await getAccessToken();
    const currentTime = new Date();
    const datetime = currentTime.toISOString().split(".")[0] + "+05:30";
    const coordinates = "28.6139,77.2090";
    const encodedDatetime = encodeURIComponent(datetime);

    const fetchOpts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // Fetch Panchang
    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    );
    if (!panchangRes.ok) throw new Error(`Panchang fetch failed: ${panchangRes.status}`);
    const panchangData = await panchangRes.json();

    // Fetch inauspicious periods (Rahu etc.)
    const inauspiciousRes = await fetch(
      `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    );
    if (!inauspiciousRes.ok)
      throw new Error(`Inauspicious fetch failed: ${inauspiciousRes.status}`);
    const inauspiciousData = await inauspiciousRes.json();

    // Extract values
    const currentTithi =
      panchangData?.data?.tithi?.find((t: any) => isNowBetween(t.start, t.end)) ||
      panchangData?.data?.tithi?.[0];
    const currentNakshatra =
      panchangData?.data?.nakshatra?.find((n: any) => isNowBetween(n.start, n.end)) ||
      panchangData?.data?.nakshatra?.[0];

    const rahu = inauspiciousData?.data?.muhurat?.find((m: any) => m.name === "Rahu");
    const rahuPeriod = rahu?.period?.[0];
    const rahuKaal = rahuPeriod
      ? `${new Date(rahuPeriod.start).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}–${new Date(rahuPeriod.end).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "—";

    const snapshot = {
      tithi: currentTithi?.name || "—",
      paksha: currentTithi?.paksha || "—",
      nakshatra: currentNakshatra?.name || "—",
      rahuKaal,
      updatedAt: currentTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };


    userCache.set(ip, { data: snapshot, timestamp: now });
    console.log(`Cached new snapshot for ${ip} until ${new Date(now + CACHE_TTL).toLocaleTimeString()}`);

    return NextResponse.json(snapshot, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    console.error("Snapshot API error:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch snapshot", details: err.message },
      { status: 500 }
    );
  }
}
