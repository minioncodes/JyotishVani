import { NextResponse } from "next/server";
import { getAccessToken } from "../snapshot/route";

const SIGNS = [
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

// In-memory cache
let cache: { datetime: string; data: any[]; timestamp: number } | null = null;
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6h

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const querySign = url.searchParams.get("sign");
    const datetime =
      url.searchParams.get("datetime") ||
      new Date().toISOString().split("T")[0] + "T00:00:00+00:00";

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
        `https://api.prokerala.com/v2/horoscope/daily/advanced?sign=${sign}&datetime=${datetime}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) return { sign, error: `Failed with ${res.status}` };

      const data = await res.json();
      console.log("Fetched horoscope for", sign, data);
      const dp = data?.data?.daily_predictions?.[0];
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

    cache = { datetime, data: results, timestamp: now };

    return NextResponse.json({ status: "ok", datetime, predictions: results });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
