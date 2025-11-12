import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0;

const userCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
const TZ = "Asia/Kolkata";

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    console.log("[Token] Using cached token until", new Date(tokenExpiry).toLocaleString("en-IN", { timeZone: TZ }));
    return cachedToken;
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
  tokenExpiry = now + (data.expires_in - 60) * 1000;
  console.log("[Token] Cached until", new Date(tokenExpiry).toLocaleString("en-IN", { timeZone: TZ }));
  return cachedToken;
}

// Epoch-compare to avoid timezone mistakes
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
  // yyyy-mm-dd in IST
  const s = d.toLocaleString("sv-SE", { timeZone: TZ }); // "YYYY-MM-DD HH:mm:ss"
  return s.slice(0, 10);
}

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown-user";
    const now = Date.now();

    const cached = userCache.get(ip);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      console.log(`[Cache] Serving cached snapshot for ${ip}`);
      return NextResponse.json(cached.data, { headers: { "Cache-Control": "no-store" } });
    }

    console.log(`[Cache] No valid cache for ${ip}, fetching fresh snapshot...`);
    const token = await getAccessToken();

    // Always call API with today's IST midnight
    const todayIST = toISTDateKey(new Date());
    const datetime = `${todayIST}T00:00:00+05:30`;
    const coordinates = "28.6139,77.2090";
    const encodedDatetime = encodeURIComponent(datetime);

    console.log("[Fetch] Using IST date:", todayIST, "| datetime param:", datetime);

    const fetchOpts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // Panchang
    const panchangUrl = `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`;
    console.log("[Fetch] Panchang URL:", panchangUrl);
    const panchangRes = await fetch(panchangUrl, fetchOpts);
    if (!panchangRes.ok) throw new Error(`Panchang fetch failed: ${panchangRes.status}`);
    const panchangData = await panchangRes.json();
    console.log("[Panchang] ok, tithi count:",
      panchangData?.data?.tithi?.length, "nakshatra count:", panchangData?.data?.nakshatra?.length);

    // Inauspicious
    const inauspUrl = `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`;
    console.log("[Fetch] Inauspicious URL:", inauspUrl);
    const inauspiciousRes = await fetch(inauspUrl, fetchOpts);
    if (!inauspiciousRes.ok) throw new Error(`Inauspicious fetch failed: ${inauspiciousRes.status}`);
    const inauspiciousData = await inauspiciousRes.json();
    console.log("[Inauspicious] ok");

    // Current Tithi/Nakshatra
    const tithis = panchangData?.data?.tithi || [];
    const nakshatras = panchangData?.data?.nakshatra || [];
    const currentTithi = tithis.find((t: any) => isNowBetween(t.start, t.end)) || tithis[0];
    const currentNakshatra = nakshatras.find((n: any) => isNowBetween(n.start, n.end)) || nakshatras[0];

    // Rahu selection logic
    const rahu = inauspiciousData?.data?.muhurat?.find((m: any) => m.name === "Rahu");
    const periods: any[] = Array.isArray(rahu?.period) ? rahu.period : [];
    console.log("[Rahu] periods:", periods.map(p => ({
      start: p.start,
      end: p.end,
      startIST: toISTTime(p.start),
      endIST: toISTTime(p.end),
      startDateIST: toISTDateKey(new Date(p.start)),
    })));

    // Ensure we pick today's IST Rahu period. Prefer the one active now.
    const todayPeriods = periods.filter(p => toISTDateKey(new Date(p.start)) === todayIST);
    let rahuPeriod =
      todayPeriods.find(p => isNowBetween(p.start, p.end)) ||
      todayPeriods[0] ||
      periods.find(p => isNowBetween(p.start, p.end)) ||
      periods[0];

    console.log("[Rahu] chosen:", rahuPeriod ? {
      start: rahuPeriod.start,
      end: rahuPeriod.end,
      startIST: toISTTime(rahuPeriod.start),
      endIST: toISTTime(rahuPeriod.end),
      startDateIST: toISTDateKey(new Date(rahuPeriod.start)),
    } : null);

    const rahuKaal = rahuPeriod ? `${toISTTime(rahuPeriod.start)}–${toISTTime(rahuPeriod.end)}` : "—";

    const snapshot = {
      tithi: currentTithi?.name || "—",
      paksha: currentTithi?.paksha || "—",
      nakshatra: currentNakshatra?.name || "—",
      rahuKaal,
      updatedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: TZ }),
    };

    userCache.set(ip, { data: snapshot, timestamp: now });
    console.log(`[Cache] Stored snapshot for ${ip} until ${new Date(now + CACHE_TTL).toLocaleString("en-IN", { timeZone: TZ })}`);
    console.log("[Snapshot] Final:", snapshot);

    return NextResponse.json(snapshot, { headers: { "Cache-Control": "no-store" } });
  } catch (err: any) {
    console.error("[Snapshot Error]", err?.stack || err?.message || err);
    return NextResponse.json(
      { error: "Failed to fetch snapshot", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
