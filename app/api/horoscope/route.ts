// app/api/horoscope/route.ts
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

function todayIST() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: TZ });
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

    const dayData = (await redis.get(cacheKey)) as HoroscopeDay | null;

    if (!dayData || !dayData[sign]) {
      return NextResponse.json(
        {
          success: false,
          ready: false,
          message:
            "Horoscope not generated yet. Prefetch job has to run for today.",
        },
        { status: 503 }
      );
    }

    const { date, predictions } = dayData[sign];

    return NextResponse.json({
      success: true,
      sign,
      date,
      predictions,
      cached: true,
    });
  } catch (err: any) {
    console.error("Horoscope read error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
