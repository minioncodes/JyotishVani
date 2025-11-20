import { NextResponse } from "next/server";
import Horoscope from "@/models/Horoscope";
import connectDB from "@/lib/mongo";
import { getProkeralaToken } from "@/lib/prokerala";

const SIGNS = [
  "aries","taurus","gemini","cancer","leo",
  "virgo","libra","scorpio","sagittarius","capricorn",
  "aquarius","pisces"
];

function todayIST() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function fetchSign(sign: string, dateTime: string, token: string) {
  console.log(`Fetching sign: ${sign}`);

  const params = new URLSearchParams({
    sign,
    type: "all",
    datetime: dateTime,
  });

  const url = "https://api.prokerala.com/v2/horoscope/daily/advanced?" + params;

  console.log(`Calling Prokerala URL: ${url}`);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(`Response for ${sign}: status ${res.status}`);

  if (!res.ok) {
    const text = await res.text();
    console.log(`Error response for ${sign}: ${text}`);
    return { success: false, status: res.status, error: text };
  }

  const json = await res.json();
  const predictions = json?.data?.daily_predictions?.[0]?.predictions ?? [];

  console.log(`Predictions count for ${sign}: ${predictions.length}`);

  await Horoscope.findOneAndUpdate(
    { sign, date: dateTime.split("T")[0] },
    {
      predictions: predictions.map((p: any) => ({
        type: p.type,
        prediction: p.prediction,
        challenge: p.challenge,
      })),
      date: dateTime.split("T")[0],
    },
    { upsert: true }
  );

  console.log(`Saved ${sign} to MongoDB`);

  return { success: true };
}

export async function GET() {
  try {
    console.log("=== PREFETCH STARTED ===");

    await connectDB();
    console.log("MongoDB connected");

    const today = todayIST();
    const dateTime = `${today}T00:00:00+05:30`;

    console.log("Today IST:", today);

    console.log("Deleting older horoscope entries...");
    await Horoscope.deleteMany({ date: { $ne: today } });
    console.log("Old data cleared");

    console.log("Fetching Prokerala token...");
    const token = await getProkeralaToken();
    if (!token) throw new Error("Token is null");
    console.log("Token fetched OK");

    const BATCH_SIZE = 5;
    let totalSaved = 0;

    for (let i = 0; i < SIGNS.length; i += BATCH_SIZE) {
      const batch = SIGNS.slice(i, i + BATCH_SIZE);

      console.log(`Starting batch: ${batch.join(", ")}`);

      const results = await Promise.all(
        batch.map((sign) => fetchSign(sign, dateTime, token))
      );

      const saved = results.filter(r => r.success).length;
      totalSaved += saved;

      console.log(`Batch saved: ${saved}/${batch.length}`);

      if (i + BATCH_SIZE < SIGNS.length) {
        console.log("Waiting 65 seconds before next batch...");
        await new Promise((resolve) => setTimeout(resolve, 65000));
      }
    }

    console.log("=== PREFETCH COMPLETED ===");
    console.log(`Total saved signs: ${totalSaved}/12`);

    return NextResponse.json({
      success: true,
      message: "Horoscope fetch completed",
      saved: totalSaved,
    });

  } catch (err: any) {
    console.log("=== PREFETCH ERROR ===");
    console.log(err);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
