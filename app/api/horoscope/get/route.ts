import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";

const TZ = "Asia/Kolkata";
const HORO_KEY_PREFIX = "horo:";

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

function todayIST(): string {
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
    const sign = searchParams.get("sign")?.toLowerCase();

    if (!sign) {
      return NextResponse.json(
        { success: false, error: "Missing sign" },
        { status: 400 }
      );
    }

    const today = todayIST();
    const cacheKey = `${HORO_KEY_PREFIX}${today}`;

    const raw = await redis.get(cacheKey);

    // Safe parse for both Upstash (object) & ioredis (string)
    const data: HoroscopeDay | null =
      raw && typeof raw === "string"
        ? JSON.parse(raw)
        : (raw as HoroscopeDay | null);

    if (!data || !data[sign]) {
      return NextResponse.json(
        {
          success: false,
          ready: false,
          message: "Horoscope not ready. Prefetch cron has not run yet."
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      sign,
      date: data[sign].date,
      predictions: data[sign].predictions
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
