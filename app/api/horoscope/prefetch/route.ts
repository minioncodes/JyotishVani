import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const HORO_KEY_PREFIX = "horo:";
const PREFETCH_SECRET = process.env.HORO_PREFETCH_SECRET;

function todayIST() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const secret = searchParams.get("secret");
    const force = searchParams.get("force") === "1";

    const isCron = req.headers.get("x-vercel-cron") !== null;

    // the fix: block ALL manual calls without secret
    if (!isCron && secret !== PREFETCH_SECRET) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const today = todayIST();
    const cacheKey = `${HORO_KEY_PREFIX}${today}`;

    // prevent re-run in DEV
    if (!force) {
      const existing = await redis.get(cacheKey);
      if (existing) {
        return NextResponse.json({
          success: true,
          alreadyPrefetched: true,
          date: today
        });
      }
    }

    // Only now run expensive API calls
    const token = await getProkeralaToken();
    const datetime = `${today}T00:00:00+05:30`;

    const signs = [
      "aries", "taurus", "gemini", "cancer", "leo", "virgo",
      "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
    ];

    const output: Record<string, any> = {};

    for (const sign of signs) {
      const params = new URLSearchParams({
        sign,
        type: "all",
        datetime
      });

      const res = await fetch(
        "https://api.prokerala.com/v2/horoscope/daily/advanced?" + params,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) continue;

      const json = await res.json();

      output[sign] = {
        date: datetime,
        predictions:
          json?.data?.daily_predictions?.[0]?.predictions?.map((p: any) => ({
            type: p.type,
            prediction: p.prediction,
            challenge: p.challenge
          })) ?? []
      };
    }

    await redis.set(cacheKey, output, { ex: 26 * 60 * 60 });

    return NextResponse.json({
      success: true,
      storedSigns: Object.keys(output)
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
