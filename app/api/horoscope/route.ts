import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0; // ms timestamp

const horoscopeCache = new Map<
  string,
  { date: string; predictions: any[]; timestamp: number }
>();

const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry - 120_000) {
    return cachedToken;
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token fetch failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000 - 60_000; // buffer 1 min

  return cachedToken;
}

function isoMidnightWithLocalOffset(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");

  const tz = -now.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const hh = String(Math.floor(Math.abs(tz) / 60)).padStart(2, "0");
  const mm = String(Math.abs(tz) % 60).padStart(2, "0");

  return `${y}-${m}-${d}T00:00:00${sign}${hh}:${mm}`;
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sign = searchParams.get("sign")?.toLowerCase() || "aries";
    const now = Date.now();


    const cached = horoscopeCache.get(sign);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        cached: true,
        sign,
        date: cached.date,
        predictions: cached.predictions,
      });
    }


    const token = await getAccessToken();
    const datetime = isoMidnightWithLocalOffset();

    const params = new URLSearchParams({
      sign,
      type: "all",
      datetime,
    });

    const url = `https://api.prokerala.com/v2/horoscope/daily/advanced?${params.toString()}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Horoscope fetch failed:", res.status, text);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const json = await res.json();

    const predictions =
      json?.data?.daily_predictions?.[0]?.predictions?.map((p: any) => ({
        type: p.type,
        prediction: p.prediction,
        challenge: p.challenge,
      })) || [];

    horoscopeCache.set(sign, {
      date: datetime,
      predictions,
      timestamp: now,
    });

    return NextResponse.json({
      success: true,
      cached: false,
      sign,
      date: datetime,
      predictions,
    });
  } catch (err: any) {
    console.error("Horoscope Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
