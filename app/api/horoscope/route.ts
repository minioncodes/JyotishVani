import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0; // UNIX ms

const horoscopeCache = new Map<
  string,
  { data: { date: string; predictions: any[] }; timestamp: number }
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
      client_id: process.env.PROKERALA_CLIENT_ID || "",
      client_secret: process.env.PROKERALA_CLIENT_SECRET || "",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token fetch failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;


  tokenExpiry = now + data.expires_in * 1000 - 60_000;
  console.log("✅ Token valid until:", new Date(tokenExpiry).toLocaleTimeString());

  return cachedToken;
}


function isoMidnightWithLocalOffset(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const tzMinutes = -now.getTimezoneOffset();
  const sign = tzMinutes >= 0 ? "+" : "-";
  const hh = String(Math.floor(Math.abs(tzMinutes) / 60)).padStart(2, "0");
  const mm = String(Math.abs(tzMinutes) % 60).padStart(2, "0");
  return `${y}-${m}-${d}T00:00:00${sign}${hh}:${mm}`;
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sign = searchParams.get("sign") || "aries";
    const now = Date.now();


    const cached = horoscopeCache.get(sign);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      console.log(` Using cached horoscope for ${sign}`);
      return NextResponse.json({
        success: true,
        sign,
        date: cached.data.date,
        predictions: cached.data.predictions,
        cached: true,
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


    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(" Horoscope fetch failed:", response.status, text);
      return NextResponse.json(
        { success: false, error: "Horoscope fetch failed" },
        { status: 500 }
      );
    }

    const json = await response.json();


    const simplified =
      json?.data?.daily_predictions?.[0]?.predictions?.map((p: any) => ({
        type: p.type,
        prediction: p.prediction,
        challenge: p.challenge,
      })) ?? [];

    const data = { date: datetime, predictions: simplified };
    horoscopeCache.set(sign, { data, timestamp: now });

    console.log(` Cached horoscope for ${sign} until refresh in 12h`);

    return NextResponse.json({
      success: true,
      sign,
      ...data,
      cached: false,
    });
  } catch (err: any) {
    console.error(" Horoscope API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
