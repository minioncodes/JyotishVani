import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const SNAPSHOT_TTL_SECONDS = 4* 60 * 60; // 24 hours 
const SNAPSHOT_SECRET = process.env.SNAPSHOT_SECRET;

// Default coordinates (Delhi) – you can change this or make it dynamic later
const COORDINATES = "28.6139,77.2090";

type PanchangTithi = {
  name: string;
  paksha: string;
  start: string;
  end: string;
};

type PanchangNakshatra = {
  name: string;
  start: string;
  end: string;
};

type Snapshot = {
  tithi: string;
  paksha: string;
  nakshatra: string;
  rahuKaal: string;
  fetchedAtIST: string;
  expiresAtIST: string;
  lastRefreshISO: string;
};

function todayIST(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function istNowISO(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function toISTDate(d: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function toISTTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}

function isBetweenNow(startISO: string, endISO: string): boolean {
  const now = Date.now();
  const start = Date.parse(startISO);
  const end = Date.parse(endISO);
  return now >= start && now <= end;
}

function parseRedisJson<T>(raw: unknown): T | null {
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
  return raw as T;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const force = url.searchParams.get("force") === "1";
    const secret = url.searchParams.get("secret");

    const isCron =
      req.headers.get("x-vercel-cron") !== null ||
      req.headers.get("x-vercel-scheduled") !== null;

    const today = todayIST();
    const cacheKey = `snapshot:${today}`;

    // Use cache if available and not forced
    if (!force) {
      const cachedRaw = await redis.get(cacheKey);
      const cached = parseRedisJson<Snapshot>(cachedRaw);

      if (cached) {
        return NextResponse.json({ ...cached, cached: true });
      }
    }

    // If force refresh is requested, protect with secret (to avoid abuse)
    if (force && !isCron && secret !== SNAPSHOT_SECRET) {
      return NextResponse.json(
        { success: false, error: "Forbidden (invalid snapshot secret)" },
        { status: 403 }
      );
    }

    // Fetch fresh snapshot from Prokerala
    const token = await getProkeralaToken();
    const datetime = `${today}T00:00:00+05:30`;
    const encodedDatetime = encodeURIComponent(datetime);

    const fetchOptions: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // 1) Panchang
    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${COORDINATES}&datetime=${encodedDatetime}`,
      fetchOptions
    );

    if (!panchangRes.ok) {
      throw new Error(
        `Panchang API failed with status ${panchangRes.status}`
      );
    }

    const panchangJson = await panchangRes.json();

    const tithis: PanchangTithi[] = panchangJson?.data?.tithi ?? [];
    const nakshatras: PanchangNakshatra[] = panchangJson?.data?.nakshatra ?? [];

    const currentTithi =
      tithis.find((t) => isBetweenNow(t.start, t.end)) || tithis[0];

    const currentNakshatra =
      nakshatras.find((n) => isBetweenNow(n.start, n.end)) || nakshatras[0];

    // 2) Inauspicious periods (for Rahu Kaal)
    const inaRes = await fetch(
      `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${COORDINATES}&datetime=${encodedDatetime}`,
      fetchOptions
    );

    if (!inaRes.ok) {
      throw new Error(
        `Inauspicious-period API failed with status ${inaRes.status}`
      );
    }

    const inaJson = await inaRes.json();

    const rahu = inaJson?.data?.muhurat?.find(
      (m: any) => m.name === "Rahu"
    );

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

    const now = new Date();
    const snapshot: Snapshot = {
      tithi: currentTithi?.name ?? "—",
      paksha: currentTithi?.paksha ?? "—",
      nakshatra: currentNakshatra?.name ?? "—",
      rahuKaal,
      fetchedAtIST: istNowISO(),
      expiresAtIST: new Date(
        now.getTime() + SNAPSHOT_TTL_SECONDS * 1000
      ).toLocaleString("en-IN", { timeZone: TZ }),
      lastRefreshISO: now.toISOString(),
    };

    await redis.set(cacheKey, JSON.stringify(snapshot), {
      ex: SNAPSHOT_TTL_SECONDS,
    });

    return NextResponse.json({ ...snapshot, cached: false });
  } catch (err: any) {
    console.error("Snapshot Error:", err);
    return NextResponse.json(
      { success: false, error: err?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
