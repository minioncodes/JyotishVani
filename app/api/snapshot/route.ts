import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0;

// Fetch and cache access token
async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry) {
    console.log("Using cached token (valid until)", new Date(tokenExpiry).toLocaleTimeString());
    return cachedToken;
  }

  console.log("Requesting new Prokerala access token...");
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
  console.log("New token cached until", new Date(tokenExpiry).toLocaleTimeString());
  return cachedToken;
}

function isNowBetween(start: string, end: string): boolean {
  const now = new Date();
  return now >= new Date(start) && now <= new Date(end);
}

export async function GET() {
  try {
    const token = await getAccessToken();
    const now = new Date();
    const datetime = now.toISOString().split(".")[0] + "+05:30";
    const coordinates = "28.6139,77.2090";
    const encodedDatetime = encodeURIComponent(datetime);

    const fetchOpts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // Panchang
    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    );
    if (!panchangRes.ok) throw new Error(`Panchang fetch failed: ${panchangRes.status}`);
    const panchangData = await panchangRes.json();

    // Choghadiya
    // const choghadiyaRes = await fetch(
    //   `https://api.prokerala.com/v2/astrology/choghadiya?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
    //   fetchOpts
    // );
    // if (!choghadiyaRes.ok) throw new Error(`Choghadiya fetch failed: ${choghadiyaRes.status}`);
    // const choghadiyaData = await choghadiyaRes.json();

    // Inauspicious & auspicious periods
    const inauspiciousRes = await fetch(
      `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    );
    if (!inauspiciousRes.ok)
      throw new Error(`Inauspicious fetch failed: ${inauspiciousRes.status}`);
    const inauspiciousData = await inauspiciousRes.json();

    // Parse snapshot data
    const currentTithi =
      panchangData?.data?.tithi?.find((t: any) => isNowBetween(t.start, t.end)) ||
      panchangData?.data?.tithi?.[0];

    const currentNakshatra =
      panchangData?.data?.nakshatra?.find((n: any) => isNowBetween(n.start, n.end)) ||
      panchangData?.data?.nakshatra?.[0];

    // const currentMuhurat =
    //   choghadiyaData?.data?.muhurat?.find((m: any) => isNowBetween(m.start, m.end)) ||
    //   choghadiyaData?.data?.muhurat?.[0];

    // Rahu Kaal
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

    // // Amrit Kaal
    // const amrit = inauspiciousData?.data?.muhurat?.find((m: any) => m.name === "Amrit");
    // const amritPeriod = amrit?.period?.[0];
    // const amritKaal = amritPeriod
    //   ? `${new Date(amritPeriod.start).toLocaleTimeString("en-IN", {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     })}–${new Date(amritPeriod.end).toLocaleTimeString("en-IN", {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     })}`
    //   : "—";

    return NextResponse.json(
      {
        tithi: currentTithi?.name || "—",
        paksha: currentTithi?.paksha || "—",
        nakshatra: currentNakshatra?.name || "—",
        // choghadiya: currentMuhurat
        //   ? `${currentMuhurat.name} (${currentMuhurat.type})`
        //   : "—",
        rahuKaal,
        // amritKaal,
        updatedAt: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    console.error("Snapshot API error:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch live snapshot", details: err.message },
      { status: 500 }
    );
  }
}
