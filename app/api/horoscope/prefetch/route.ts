// app/api/horoscope/prefetch/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const HORO_KEY_PREFIX = "horo:";
const PREFETCH_SECRET = process.env.HORO_PREFETCH_SECRET;

type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

type Prediction = {
  type: string;
  prediction: string;
  challenge: string | null;
};

type HoroscopeDay = Record<
  ZodiacSign,
  {
    date: string;
    predictions: Prediction[];
  }
>;

const SIGNS: ZodiacSign[] = [
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

function todayIST(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");
    const force = url.searchParams.get("force") === "1";

    const isCron =
      req.headers.get("x-vercel-cron") !== null ||
      req.headers.get("x-vercel-scheduled") !== null;

    // Only allow:
    // - Vercel Cron requests
    // - OR manual requests with the correct secret
    if (!isCron && secret !== PREFETCH_SECRET) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const today = todayIST();
    const cacheKey = `${HORO_KEY_PREFIX}${today}`;

    // If data already exists for today and not forced, do nothing
    if (!force) {
      const existing = await redis.get(cacheKey);
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

    const output: Partial<HoroscopeDay> = {};

    // Single call per sign (no 3x retry loop to avoid token storms)
    for (const sign of SIGNS) {
      try {
        const params = new URLSearchParams({
          sign,
          type: "all",
          datetime,
        });

        const res = await fetch(
          "https://api.prokerala.com/v2/horoscope/daily/advanced?" + params,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          console.error(
            `Failed to fetch horoscope for ${sign}. Status: ${res.status}`
          );
          continue;
        }

        const json = await res.json();

        const predictions =
          json?.data?.daily_predictions?.[0]?.predictions?.map(
            (p: any): Prediction => ({
              type: p.type,
              prediction: p.prediction,
              challenge: p.challenge ?? null,
            })
          ) ?? [];

        output[sign] = {
          date: datetime,
          predictions,
        };
      } catch (err) {
        console.error(`Error while fetching horoscope for ${sign}:`, err);
      }
    }

    // Save final object for all signs in Redis for ~26 hours
    await redis.set(cacheKey, JSON.stringify(output), {
      ex: 26 * 60 * 60, // 26 hours
    });

    return NextResponse.json({
      success: true,
      storedSigns: Object.keys(output),
      date: today,
      forced: force,
      cron: isCron,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
