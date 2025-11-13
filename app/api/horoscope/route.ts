import { NextResponse } from "next/server";
import { redis } from "@/lib/Redis";

let cachedToken: string | null = null;
let tokenExpiry = 0;

const HORO_TTL = 12 * 60 * 60; // 12 hours

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry - 60000) return cachedToken;

  console.log("🔄 Fetching Prokerala token…");

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) throw new Error("Token fetch failed");

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;

  return cachedToken;
}

function todayIST() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Kolkata" });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sign = searchParams.get("sign")?.toLowerCase() || "aries";
    const today = todayIST();
    const cacheKey = `horo:${sign}:${today}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`♻️ Using cached: ${sign}`);
      return NextResponse.json({ success: true, ...cached, cached: true });
    }

    const token = await getAccessToken();
    const datetime = `${today}T00:00:00+05:30`;

    const params = new URLSearchParams({ sign, type: "all", datetime });
    const url = `https://api.prokerala.com/v2/horoscope/daily/advanced?${params}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Horoscope fetch failed" },
        { status: 500 }
      );
    }

    const json = await response.json();
    const predictions =
      json?.data?.daily_predictions?.[0]?.predictions?.map((p: any) => ({
        type: p.type,
        prediction: p.prediction,
        challenge: p.challenge,
      })) ?? [];

    const finalData = { sign, date: datetime, predictions };

    await redis.set(cacheKey, finalData, { ex: HORO_TTL });

    return NextResponse.json({ success: true, ...finalData, cached: false });
  } catch (err: any) {
    console.error("Horoscope Error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
