import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const HORO_KEY = "horo:";

type Prediction = {
  type: string;
  prediction: string;
  challenge: string;
};

export type HoroscopeDayCache = Record<
  string,
  {
    date: string;
    predictions: Prediction[];
  }
>;

function todayIST() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: TZ });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sign = searchParams.get("sign")?.toLowerCase() || "aries";

    const today = todayIST();
    const cacheKey = `${HORO_KEY}${today}`;

    // 1️⃣ Check Redis first
    const cached = (await redis.get(cacheKey)) as HoroscopeDayCache | null;

    if (cached && cached[sign]) {
      console.log(`♻️ Cached horoscope returned for ${sign}`);
      return NextResponse.json({ success: true, ...cached[sign], cached: true });
    }

    // 2️⃣ Missing? → Fetch all 12 signs at once
    console.log("🌙 Fetching ALL 12 signs from Prokerala...");

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

    let finalCache: HoroscopeDayCache = {};

    for (const s of signs) {
      const params = new URLSearchParams({ sign: s, type: "all", datetime });
      const url = `https://api.prokerala.com/v2/horoscope/daily/advanced?${params}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const json = await res.json();

      const predictions =
        json?.data?.daily_predictions?.[0]?.predictions?.map((p: any) => ({
          type: p.type,
          prediction: p.prediction,
          challenge: p.challenge,
        })) || [];

      finalCache[s] = {
        date: datetime,
        predictions,
      };
    }

    // 3️⃣ Save all 12 signs to Redis (24h)
    await redis.set(cacheKey, finalCache, {
      ex: 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      ...finalCache[sign],
      cached: false,
    });
  } catch (err: any) {
    console.error("Horoscope error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
