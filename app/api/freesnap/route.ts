import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import Snapshot, { SnapshotDoc } from "@/models/Snapshot";

function convertTo12Hour(time: string) {
  if (!time) return "N/A";
  const [h, m, s] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${suffix}`;
}

export async function GET() {
  await connectDB();

  const latest = await Snapshot.findOne().lean<SnapshotDoc | null>();

  if (
    latest &&
    latest.nextRefreshISO &&
    Date.now() < new Date(latest.nextRefreshISO).getTime()
  ) {
    return NextResponse.json(latest);
  }

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
      `${process.env.ASTROLOGY_API_USER_ID}:${process.env.ASTROLOGY_API_KEY}`
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

  function toDate(timeObj: any) {
    if (!timeObj) return null;
    const dt = new Date();
    dt.setHours(timeObj.hour, timeObj.minute, timeObj.second, 0);
    return dt;
  }

  const tithiDate = toDate(json?.tithi?.end_time);
  const nakDate = toDate(json?.nakshatra?.end_time);

  const rahuEndDate = (() => {
    const rahuEnd = json?.rahukaal?.end;
    if (!rahuEnd) return null;
    const [h, m, s] = rahuEnd.split(":").map(Number);
    const dt = new Date();
    dt.setHours(h, m, s, 0);
    return dt;
  })();

  const transitions = [tithiDate, nakDate, rahuEndDate].filter(Boolean) as Date[];
  const nextRefresh = transitions.length
    ? transitions.sort((a, b) => a.getTime() - b.getTime())[0]
    : new Date(now.getTime() + 60 * 60 * 1000);

  const mapped: SnapshotDoc = {
    tithi: json?.tithi?.details?.tithi_name || "N/A",
    paksha: json?.paksha || "N/A",
    nakshatra: json?.nakshatra?.details?.nak_name || "N/A",
    rahuKaal: json?.rahukaal
      ? `${convertTo12Hour(json.rahukaal.start)} - ${convertTo12Hour(
          json.rahukaal.end
        )}`
      : "N/A",
    updatedAt: new Date().toISOString(),
    nextRefreshISO: nextRefresh ? nextRefresh.toISOString() : null,
  };

  const saved = await Snapshot.findOneAndUpdate({}, mapped, {
    upsert: true,
    new: true,
  });

  return NextResponse.json(saved);
}
