import { NextResponse } from "next/server";
async function getAccessToken() {
  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID || "",
      client_secret: process.env.PROKERALA_CLIENT_SECRET || "",
    }),
  });
  const data = await res.json();
  return data.access_token;
}

const SIGNS = [
  // "aries",
  // "taurus",
  // "gemini",
  // "cancer",
  // "leo",
  // "virgo",
  // "libra",
  // "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

let cache: { datetime: string; data: any[]; timestamp: number } | null = null;
const CACHE_TTL = 1000 * 60 * 60 * 6;
console.log("get route got calleddd")
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const querySign = url.searchParams.get("sign");
    const datetime =
      url.searchParams.get("datetime") ||
      new Date().toISOString().split("T")[0] + "T00:00:00%2B00:00";
    const now = Date.now();
    if (cache && cache.datetime === datetime && now - cache.timestamp < CACHE_TTL) {
      let results = cache.data;
      if (querySign) {
        results = results.filter(
          (r) => r.sign?.name?.toLowerCase() === querySign.toLowerCase()
        );
      }
      return NextResponse.json({ status: "ok", datetime, predictions: results });
    }
    const token = await getAccessToken();
    async function fetchSign(sign: string) {
      const res = await fetch(
        `https://api.prokerala.com/v2/horoscope/daily/advanced?sign=${sign}&datetime=${datetime}&type=all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) {
        const errBody = await res.text();
        console.error("Error response from Prokerala:", res.status, errBody);
        return { sign, error: `Failed with ${res.status}`, details: errBody };
      }
      const data = await res.json();
      const dp = data?.data?.daily_predictions?.[0];
      console.log("dp = ", dp);
      if (!dp) return { sign, error: "No prediction found" };
      return {
        sign: {
          id: dp.sign?.id,
          name: dp.sign?.name,
          lord: dp.sign?.lord?.name,
          symbol: dp.sign_info?.unicode_symbol,
        },
        predictions: dp.predictions?.map((p: any) => ({
          type: p.type,
          prediction: p.prediction,
          seek: p.seek,
          challenge: p.challenge,
          insight: p.insight,
        })) || [],
      };
    }
    let results: any[] = [];
    if (querySign) {
      results = [await fetchSign(querySign)];
    } else {
      for (const s of SIGNS) {
        const data = await fetchSign(s);
        results.push(data);
        await new Promise((r) => setTimeout(r, 300));
      }
    }
    console.log("result from the api = ", results);

    cache = { datetime, data: results, timestamp: now };
    return NextResponse.json({ status: "ok", datetime,  results });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}

// working url = http://localhost:3000/api/horoscope?sign=aries&datetime=2025-09-26T00:00:00Z&type=all
// current url = 'https://api.prokerala.com/v2/horoscope/daily/advanced?sign=taurus&datetime=2025-09-26T00:00:00+00:00&type=all'
