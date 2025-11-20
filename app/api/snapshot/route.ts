import { NextResponse } from "next/server";
import Snapshot from "@/models/Snapshot";
import connectDB from "@/lib/mongo";
import { getProkeralaToken } from "@/lib/prokerala";

const TZ = "Asia/Kolkata";
const TTL_HOURS = 2; // refresh interval
const COORDINATES = "28.6139,77.2090"; // Delhi (change if needed)

function todayIST() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function istNowISO() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function isExpired(lastISO: string) {
  const last = new Date(lastISO).getTime();
  const now = Date.now();
  const diffHours = (now - last) / (1000 * 60 * 60);
  return diffHours >= TTL_HOURS;
}

export async function GET() {
  try {
    console.log("=== SNAPSHOT ROUTE HIT ===");

    await connectDB();
    console.log("MongoDB connected");

    const today = todayIST();
    console.log("Today IST:", today);

    // load today snapshot from DB
    let snapshot = await Snapshot.findOne({ date: today });
    const expired = snapshot ? isExpired(snapshot.lastRefreshISO) : true;

    if (snapshot && !expired) {
      console.log("Serving cached snapshot");
      return NextResponse.json({ ...snapshot._doc, cached: true });
    }

    console.log("Cached snapshot expired or missing. Fetching new from Prokerala...");

    const token = await getProkeralaToken();
    console.log("Token fetched");

    const datetime = `${today}T00:00:00+05:30`;
    const encoded = encodeURIComponent(datetime);

    // Fetch PANCHANG
    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?coordinates=${COORDINATES}&ayanamsa=1&datetime=${encoded}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Panchang status:", panchangRes.status);

    const panchang = await panchangRes.json();

    // Fetch INAUSPICIOUS (for Rahu Kaal)
    const inaRes = await fetch(
      `https://api.prokerala.com/v2/astrology/inauspicious-period?coordinates=${COORDINATES}&ayanamsa=1&datetime=${encoded}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Inauspicious status:", inaRes.status);

    const ina = await inaRes.json();

    // Extract tithi & nakshatra
    const tithi = panchang?.data?.tithi?.[0]?.name ?? "—";
    const paksha = panchang?.data?.tithi?.[0]?.paksha ?? "—";
    const nakshatra = panchang?.data?.nakshatra?.[0]?.name ?? "—";

    // Extract Rahu Kaal
    const rahu = ina?.data?.muhurat?.find((m: any) => m.name === "Rahu");
    const period = rahu?.period?.[0];

    let rahuKaal = "—";
    if (period) {
      const start = new Date(period.start).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: TZ,
      });
      const end = new Date(period.end).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: TZ,
      });
      rahuKaal = `${start}-${end}`;
    }

    const nowISO = new Date().toISOString();

    const newSnapshot = {
      date: today,
      tithi,
      paksha,
      nakshatra,
      rahuKaal,
      fetchedAtIST: istNowISO(),
      lastRefreshISO: nowISO,
    };

    console.log("Saving new snapshot to MongoDB...");
    await Snapshot.findOneAndUpdate(
      { date: today },
      newSnapshot,
      { upsert: true }
    );

    console.log("Snapshot saved.");

    return NextResponse.json({ ...newSnapshot, cached: false });

  } catch (error: any) {
    console.error("SNAPSHOT ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
