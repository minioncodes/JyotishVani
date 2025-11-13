import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const SNAP_KEY = "snapshot:";

function nowIST() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TZ }));
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
    const now = nowIST();
    const today = now.toLocaleDateString("sv-SE", { timeZone: TZ });
    const cacheKey = `${SNAP_KEY}${today}`;

   const cached = (await redis.get(cacheKey)) as
  | { data: any; expiresAt: number }
  | null;

if (cached && cached.expiresAt > Date.now()) {
  console.log("♻️ Cached snapshot used");
  return NextResponse.json(cached.data);
}


    console.log("🌙 Fetching fresh snapshot...");

    const token = await getProkeralaToken();
    const datetime = `${today}T00:00:00+05:30`;
    const encoded = encodeURIComponent(datetime);
    const coords = "28.6139,77.2090";

    const opts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // Panchang
    const pan = await (
      await fetch(
        `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coords}&datetime=${encoded}`,
        opts
      )
    ).json();

    // Inauspicious (for Rahu)
    const ina = await (
      await fetch(
        `https://api.prokerala.com/v2/astrology/inauspicious-period?ayanamsa=1&coordinates=${coords}&datetime=${encoded}`,
        opts
      )
    ).json();

    // Parse tithi / nakshatra
    const tithis = pan?.data?.tithi || [];
    const nakshas = pan?.data?.nakshatra || [];

    const tithi = tithis.find((t: any) => Date.now() >= Date.parse(t.start) && Date.now() <= Date.parse(t.end)) || tithis[0];
    const nakshatra = nakshas.find((n: any) => Date.now() >= Date.parse(n.start) && Date.now() <= Date.parse(n.end)) || nakshas[0];

    // Parse Rahu Kaal
    const rahu = ina?.data?.muhurat?.find((x: any) => x.name === "Rahu");
    const p = rahu?.period || [];

    const todayPeriods = p.filter(
      (x: any) =>
        new Date(x.start).toLocaleDateString("sv-SE", { timeZone: TZ }) === today
    );

    const activeRahu =
      todayPeriods.find(
        (x: any) => Date.now() >= Date.parse(x.start) && Date.now() <= Date.parse(x.end)
      ) ||
      todayPeriods[0] ||
      p[0];

    const rahuKaal = activeRahu
      ? `${toISTTime(activeRahu.start)}–${toISTTime(activeRahu.end)}`
      : "—";

    // 2️⃣ Build snapshot
    const snapshot = {
      tithi: tithi?.name || "—",
      paksha: tithi?.paksha || "—",
      nakshatra: nakshatra?.name || "—",
      rahuKaal,
      updatedAt: now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: TZ,
      }),
    };

    // 3️⃣ Calculate dynamic TTL (until next event)
    const upcomingTimes = [];

    if (tithi?.end) upcomingTimes.push(Date.parse(tithi.end));
    if (nakshatra?.end) upcomingTimes.push(Date.parse(nakshatra.end));
    if (activeRahu?.end) upcomingTimes.push(Date.parse(activeRahu.end));

    // Always flush at midnight too
    const midnight = new Date(`${today}T23:59:59+05:30`).getTime();
    upcomingTimes.push(midnight);

    const nextEvent = Math.min(...upcomingTimes);
    const ttlSeconds = Math.max(60, Math.floor((nextEvent - Date.now()) / 1000)); // min 60 sec

    console.log("⏳ Snapshot TTL (seconds):", ttlSeconds);

    // 4️⃣ Save structured cache
    await redis.set(cacheKey, {
      data: snapshot,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });

    return NextResponse.json(snapshot);
  } catch (err: any) {
    console.error("Snapshot Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
