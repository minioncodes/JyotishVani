import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import Snapshot from "@/models/Snapshot";

const FRESHNESS_WINDOW = 60 * 60 * 1000; // 1 hour

function convertTo12Hour(time: string) {
  if (!time) return "N/A";

  const [h, m, s] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${String(m).padStart(2, "0")}:${String(s).padStart(
    2,
    "0"
  )} ${suffix}`;
}

export async function GET() {;

  await connectDB();


  // Fetch latest snapshot
  const latest = (await Snapshot.findOne().lean()) as any;
  

 
  if (
    latest &&
    Date.now() - new Date(latest.updatedAt).getTime() < FRESHNESS_WINDOW
  ) {
   
    return NextResponse.json(latest);
  }



  try {
    const now = new Date();

    const payload = {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      hour: now.getHours(),
      min: now.getMinutes(),
      lat: 26.8467,
      lon: 80.9462,
      tzone: 5.5,
    };

    const authHeader =
      "Basic " +
      Buffer.from(
        process.env.ASTROLOGY_API_USER_ID +
          ":" +
          process.env.ASTROLOGY_API_KEY
      ).toString("base64");


    const res = await fetch(
      "https://json.astrologyapi.com/v1/advanced_panchang",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(payload),
      }
    );


    const json = await res.json();
   

    // Mapping
    const mapped = {
      tithi: json?.tithi?.details?.tithi_name || "N/A",
      paksha: json?.paksha || json?.tithi?.details?.special || "N/A",
      nakshatra: json?.nakshatra?.details?.nak_name || "N/A",
      rahuKaal: json?.rahukaal
        ? `${convertTo12Hour(json.rahukaal.start)} - ${convertTo12Hour(
            json.rahukaal.end
          )}`
        : "N/A",
      updatedAt: new Date().toISOString(),
    };


    const saved = await Snapshot.findOneAndUpdate({}, mapped, {
      upsert: true,
      new: true,
    });


    return NextResponse.json(saved);
  } catch (err) {
    console.error(" ERROR:", err);

    if (latest) {
      console.log(" Returning OLD snapshot due to API error.");
      return NextResponse.json(latest);
    }

    return NextResponse.json(
      { error: "Failed to fetch panchang live data" },
      { status: 500 }
    );
  }
}
