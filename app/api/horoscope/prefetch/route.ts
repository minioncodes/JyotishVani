import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const HORO_KEY_PREFIX = "horo:";

const PREFETCH_SECRET = process.env.HORO_PREFETCH_SECRET;

type Prediction = {
  type: string;
  prediction: string;
  challenge: string;
};

type HoroscopeDay = Record<
  string,
  {
    date: string;
    predictions: Prediction[];
  }
>;

// Always compute today's date in IST using full ISO
function todayIST() {
  const now = new Date();
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const secret = searchParams.get("secret");
    const force = searchParams.get("force") === "1";

    // Cron header from wrapper
    const isCron = req.headers.get("x-vercel-cron") === "1";

    // ✔ FIX 1 — Allow cron even when secret is missing
    if (!isCron && secret !== PREFETCH_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const today = todayIST();
    const cacheKey = `${HORO_KEY_PREFIX}${today}`;

    // Skip if already prefetched (unless force=1)
    if (!force) {
      const existing = (await redis.get(cacheKey)) as HoroscopeDay | null;
      if (existing) {
        return NextResponse.json({
          success: true,
          alreadyPrefetched: true,
          date: today,
        });
      }
    }

    const token = await getProkeralaToken();
    const datetime = `${today}T00:00:00+05:30`;

    const signs = [
      "aries",
      "taurus",
      "gemini",
      "cancer",
      "leo",
      "virgo",
      "libra",
      "scorpio",
      "sagittarius",
      "capricorn",
      "aquarius",
      "pisces",
    ];

    const dayData: HoroscopeDay = {};

    for (const sign of signs) {
      const params = new URLSearchParams({
        sign,
        type: "all",
        datetime,
      });

      const url =
        "https://api.prokerala.com/v2/horoscope/daily/advanced?" +
        params.toString();

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
       
      });

      if (!res.ok) {
        console.error(`Prokerala error for ${sign}:`, res.status);
        continue;
      }

      const json = await res.json();

      const predictions: Prediction[] =
        json?.data?.daily_predictions?.[0]?.predictions?.map((p: any) => ({
          type: p.type,
          prediction: p.prediction,
          challenge: p.challenge,
        })) ?? [];

      dayData[sign] = {
        date: datetime,
        predictions,
      };
    }

    // ✔ FIX 2 — Store for 26 hours so data never expires before next cron
    await redis.set(cacheKey, dayData, { ex: 26 * 60 * 60 });

    return NextResponse.json({
      success: true,
      date: today,
      storedSigns: Object.keys(dayData),
    });
  } catch (err: any) {
    console.error("Prefetch error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
