import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0;

const userCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6h
const TZ = "Asia/Kolkata";


async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry - 120_000) {
    console.log(
      "[Token] Using cached token until",
      new Date(tokenExpiry).toLocaleString("en-IN", { timeZone: TZ })
    );
    return { token: cachedToken, expiry: tokenExpiry };
  }

  console.log("[Token] Fetching new Prokerala token...");
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
    console.error("[Token] Fetch failed:", res.status, text);
    throw new Error(`Token fetch failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000; // minus 1 min safety

  console.log(
    "[Token] Cached until",
    new Date(tokenExpiry).toLocaleString("en-IN", { timeZone: TZ })
  );
  return { token: cachedToken, expiry: tokenExpiry };
}


function isNowBetween(startISO: string, endISO: string): boolean {
  const now = Date.now();
  const start = Date.parse(startISO);
  const end = Date.parse(endISO);
  return now >= start && now <= end;
}

function toISTTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}

function toISTDateKey(d: Date) {
  const s = d.toLocaleString("sv-SE", { timeZone: TZ }); // YYYY-MM-DD HH:mm:ss
  return s.slice(0, 10);
}


export async function GET(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown-user";
    const now = Date.now();

    const cached = userCache.get(ip);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      console.log(`[Cache] Serving cached snapshot for ${ip}`);
      return NextResponse.json(cached.data, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    console.log(`[Cache] No valid cache for ${ip}, fetching fresh snapshot...`);
    const { token, expiry } = await getAccessToken();

    // Use today's IST midnight
    const todayIST = toISTDateKey(new Date());
    const datetime = `${todayIST}T00:00:00+05:30`;
    const coordinates = "28.6139,77.2090";
    const encodedDatetime = encodeURIComponent(datetime);

    const fetchOpts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // Panchang
    const panchangUrl = `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`;
    const panchangRes = await fetch(panchangUrl, fetchOpts);
    if (!panchangRes.ok)
      throw new Error(`Panchang fetch failed: ${panchangRes.status}`);
    const panchangData = await panchangRes.json();

    // Inauspicious
    const inauspUrl = `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`;
    const inauspiciousRes = await fetch(inauspUrl, fetchOpts);
    if (!inauspiciousRes.ok)
      throw new Error(`Inauspicious fetch failed: ${inauspiciousRes.status}`);
    const inauspiciousData = await inauspiciousRes.json();

    // Current tithi / nakshatra
    const tithis = panchangData?.data?.tithi || [];
    const nakshatras = panchangData?.data?.nakshatra || [];
    const currentTithi =
      tithis.find((t: any) => isNowBetween(t.start, t.end)) || tithis[0];
    const currentNakshatra =
      nakshatras.find((n: any) => isNowBetween(n.start, n.end)) ||
      nakshatras[0];

    // Rahu kaal logic
    const rahu = inauspiciousData?.data?.muhurat?.find(
      (m: any) => m.name === "Rahu"
    );
    const periods: any[] = Array.isArray(rahu?.period) ? rahu.period : [];
    const todayISTPeriods = periods.filter(
      (p) => toISTDateKey(new Date(p.start)) === todayIST
    );
    let rahuPeriod =
      todayISTPeriods.find((p) => isNowBetween(p.start, p.end)) ||
      todayISTPeriods[0] ||
      periods.find((p) => isNowBetween(p.start, p.end)) ||
      periods[0];

    const rahuKaal = rahuPeriod
      ? `${toISTTime(rahuPeriod.start)}–${toISTTime(rahuPeriod.end)}`
      : "—";

    // Final snapshot + token info (for debug or reuse)
    const snapshot = {
      tithi: currentTithi?.name || "—",
      paksha: currentTithi?.paksha || "—",
      nakshatra: currentNakshatra?.name || "—",
      rahuKaal,
      updatedAt: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: TZ,
      }),

   
      tokenInfo: {
        expiresAt: new Date(expiry).toLocaleString("en-IN", { timeZone: TZ }),
        remainingMins: Math.round((expiry - now) / 60000),
      },
    };

    userCache.set(ip, { data: snapshot, timestamp: now });
    console.log(
      `[Cache] Stored snapshot for ${ip} until`,
      new Date(now + CACHE_TTL).toLocaleString("en-IN", { timeZone: TZ })
    );

    return NextResponse.json(snapshot, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    console.error("[Snapshot Error]", err?.stack || err?.message || err);
    return NextResponse.json(
      {
        error: "Failed to fetch snapshot",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
