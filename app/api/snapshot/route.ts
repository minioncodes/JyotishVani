import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";

let cachedToken: string | null = null;
let tokenExpiry = 0;

const SNAPSHOT_TTL = 6 * 60 * 60;
const TZ = "Asia/Kolkata";

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry - 60000) return cachedToken;

  console.log("🔄 Refreshing token…");

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
  });

  const json = await res.json();
  cachedToken = json.access_token;
  tokenExpiry = now + json.expires_in * 1000;

  return cachedToken;
}

function todayIST() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: TZ });
}

function toISTDate(d: Date) {
  return d.toLocaleDateString("sv-SE", { timeZone: TZ });
}

function toISTTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}

function isNowBetween(start: string, end: string) {
  const now = Date.now();
  return now >= Date.parse(start) && now <= Date.parse(end);
}

export async function GET() {
  try {
    const today = todayIST();
    const cacheKey = `snapshot:${today}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("♻️ Cached snapshot used");
      return NextResponse.json(cached);
    }

    const token = await getAccessToken();
    const datetime = `${today}T00:00:00+05:30`;
    const encoded = encodeURIComponent(datetime);
    const coordinates = "28.6139,77.2090";

    const opts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // Panchang
    const pan = await (
      await fetch(
        `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encoded}`,
        opts
      )
    ).json();

    // Inauspicious Periods
    const ina = await (
      await fetch(
        `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coordinates}&datetime=${encoded}`,
        opts
      )
    ).json();

    const tithis = pan?.data?.tithi || [];
    const nakshas = pan?.data?.nakshatra || [];

    const currentTithi =
      tithis.find((t: any) => isNowBetween(t.start, t.end)) || tithis[0];

    const currentNakshatra =
      nakshas.find((n: any) => isNowBetween(n.start, n.end)) || nakshas[0];

    const rahu = ina?.data?.muhurat?.find((x: any) => x.name === "Rahu");
    const periods = rahu?.period || [];

    const todayPeriods = periods.filter(
      (p: any) => todayIST() === toISTDate(new Date(p.start))
    );

    const rahuPeriod =
      todayPeriods.find((p: any) => isNowBetween(p.start, p.end)) ||
      todayPeriods[0] ||
      periods[0];

    const rahuKaal = rahuPeriod
      ? `${toISTTime(rahuPeriod.start)}–${toISTTime(rahuPeriod.end)}`
      : "—";

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
    };

    await redis.set(cacheKey, snapshot, { ex: SNAPSHOT_TTL });

    return NextResponse.json(snapshot);
  } catch (err: any) {
    console.error("Snapshot Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
