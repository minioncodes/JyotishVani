import { NextResponse } from "next/server";
import Horoscope from "@/models/Horoscope";
import connectDB from "@/lib/mongo";

function todayIST() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const sign = searchParams.get("sign");

    if (!sign) {
      return NextResponse.json({ success: false, error: "Missing sign" }, { status: 400 });
    }

    const today = todayIST();

    const data = await Horoscope.findOne({ sign, date: today });

    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Horoscope not ready yet",
      });
    }

    return NextResponse.json({
      success: true,
      sign,
      date: today,
      predictions: data.predictions
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
