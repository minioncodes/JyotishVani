import { NextResponse } from "next/server";

const TZ = "Asia/Kolkata";

let cachedToken: string | null = null;
let tokenExpiry = 0;

let globalSnapshot: { data: any; timestamp: number } | null = null;

const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry - 120_000) {
    return cachedToken;
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token fetch failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in * 1000) - 60_000;

  return cachedToken;
}


function isNowBetween(s: string, e: string) {
  const now = Date.now();
  return now >= Date.parse(s) && now <= Date.parse(e);
}

function toISTDate(d?: Date) {
  const date = d || new Date();
  const s = date.toLocaleString("sv-SE", { timeZone: TZ }); // YYYY-MM-DD HH:mm:ss
  return s.slice(0, 10);
}


function toISTTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}


export async function GET() {
  try {
    const now = Date.now();


    if (globalSnapshot && now - globalSnapshot.timestamp < CACHE_TTL) {
      return NextResponse.json(globalSnapshot.data);
    }

    const token = await getAccessToken();
    const today = toISTDate();
    const datetime = `${today}T00:00:00+05:30`;
    const encodedDatetime = encodeURIComponent(datetime);

    const coordinates = "28.6139,77.2090";

    const fetchOpts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as const,
    };

    // Panchang
    const panchang = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    ).then((r) => r.json());

    // Inauspicious
    const inauspicious = await fetch(
      `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    ).then((r) => r.json());

 
    const tithis = panchang?.data?.tithi || [];
    const nakshatra = panchang?.data?.nakshatra || [];

    const currentTithi =
      tithis.find((t: any) => isNowBetween(t.start, t.end)) || tithis[0];

    const currentNakshatra =
      nakshatra.find((n: any) => isNowBetween(n.start, n.end)) ||
      nakshatra[0];

    // Rahu kaal
    const rahu = inauspicious?.data?.muhurat?.find((m: any) => m.name === "Rahu");
    const periods = rahu?.period || [];

    const todayPeriods = periods.filter(
      (p: any) => toISTDate() === toISTDate(new Date(p.start))
    );

    const active =
      todayPeriods.find((p: any) => isNowBetween(p.start, p.end)) ||
      todayPeriods[0] ||
      periods[0];

    const rahuKaal = active
      ? `${toISTTime(active.start)}–${toISTTime(active.end)}`
      : "—";

    const snapshot = {
      tithi: currentTithi?.name || "—",
      paksha: currentTithi?.paksha || "—",
      nakshatra: currentNakshatra?.name || "—",
      rahuKaal,
      updatedAt: new Date().toLocaleTimeString("en-IN", { timeZone: TZ }),
    };


    globalSnapshot = { data: snapshot, timestamp: now };

    return NextResponse.json(snapshot);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
