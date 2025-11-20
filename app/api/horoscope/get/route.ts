
import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";

const TZ = "Asia/Kolkata";
const HORO_KEY_PREFIX = "horo:";

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
    date: string; // ISO string (from Prokerala)
    predictions: Prediction[];
  }
>;

// Format today's date in IST as YYYY-MM-DD (sv-SE gives 2025-11-20)
function todayIST(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Small helper to safely parse Redis JSON
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
    const { searchParams } = new URL(req.url);
    const signParam = searchParams.get("sign");

    if (!signParam) {
      return NextResponse.json(
        { success: false, error: "Missing 'sign' query parameter" },
        { status: 400 }
      );
    }

    const sign = signParam.toLowerCase() as ZodiacSign;

    const validSigns: ZodiacSign[] = [
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

    if (!validSigns.includes(sign)) {
      return NextResponse.json(
        { success: false, error: "Invalid zodiac sign" },
        { status: 400 }
      );
    }

    const today = todayIST();
    const cacheKey = `${HORO_KEY_PREFIX}${today}`;

    const raw = await redis.get(cacheKey);
    const data = parseRedisJson<HoroscopeDay>(raw);

    if (!data || !data[sign]) {
      return NextResponse.json(
        {
          success: false,
          ready: false,
          message:
            "Horoscope not ready for today. Prefetch cron has not populated the cache yet.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      sign,
      date: data[sign].date,
      predictions: data[sign].predictions,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
