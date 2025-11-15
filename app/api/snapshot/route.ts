import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const SNAPSHOT_TTL_SECONDS = 2 * 60 * 60; // 2 hours cache

// Reliable IST datetime
function todayIST() {
  const now = new Date();
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function istNowISO() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function toISTDate(d: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(d);
}

function toISTTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}

function isBetweenNow(start: string, end: string): boolean {
  const now = Date.now();
  return now >= Date.parse(start) && now <= Date.parse(end);
}

export async function GET() {
  try {
    const today = todayIST();
    const cacheKey = `snapshot:${today}`;

    // Try cache first
    const cached = await redis.get(cacheKey);

    if (cached) {
      return NextResponse.json({ ...cached, cached: true });
    }

    // No cache → fetch fresh snapshot
    const token = await getProkeralaToken();

    const datetime = `${today}T00:00:00+05:30`;
    const encoded = encodeURIComponent(datetime);
    const coordinates = "28.6139,77.2090";

    const fetchOptions = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // Panchang API
    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encoded}`,
      fetchOptions
    );
    const panchang = await panchangRes.json();

    const tithis: any[] = panchang?.data?.tithi || [];
    const nakshatras: any[] = panchang?.data?.nakshatra || [];

    const currentTithi =
      tithis.find((t) => isBetweenNow(t.start, t.end)) || tithis[0];

    const currentNakshatra =
      nakshatras.find((n) => isBetweenNow(n.start, n.end)) || nakshatras[0];

    // Rahu Kaal
    const inaRes = await fetch(
      `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coordinates}&datetime=${encoded}`,
      fetchOptions
    );
    const ina = await inaRes.json();

    const rahu = ina?.data?.muhurat?.find((m: any) => m.name === "Rahu");
    const periods: { start: string; end: string }[] = Array.isArray(
      rahu?.period
    )
      ? rahu.period
      : [];

    const todayPeriods = periods.filter(
      (p) => todayIST() === toISTDate(new Date(p.start))
    );

    const rahuPeriod =
      todayPeriods.find((p) => isBetweenNow(p.start, p.end)) ||
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
      fetchedAtIST: istNowISO(),
      expiresAtIST: new Date(
        Date.now() + SNAPSHOT_TTL_SECONDS * 1000
      ).toLocaleString("en-IN", { timeZone: TZ }),
      lastRefreshISO: new Date().toISOString(),
    };

    await redis.set(cacheKey, snapshot, { ex: SNAPSHOT_TTL_SECONDS });

    return NextResponse.json({ ...snapshot, cached: false });
  } catch (err: any) {
    console.error("❌ Snapshot Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
