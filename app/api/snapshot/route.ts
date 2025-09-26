import { NextResponse } from "next/server";

export async function getAccessToken() {
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

// helper to check if now is between start and end
function isNowBetween(start: string, end: string): boolean {
  const now = new Date();
  return now >= new Date(start) && now <= new Date(end);
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");


    let datetime = `${year}-${month}-${day}T06:00:00+05:30`;
    if (process.env.PROKERALA_MODE === "sandbox") {
      datetime = `${year}-01-01T06:00:00+05:30`;
    }
    const coordinates = "28.6139,77.2090";
    const encodedDatetime = encodeURIComponent(datetime);


    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const panchangData = await panchangRes.json();


    const choghadiyaRes = await fetch(
      `https://api.prokerala.com/v2/astrology/choghadiya?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const choghadiyaData = await choghadiyaRes.json();

    const currentTithi =
      panchangData?.data?.tithi?.find((t: any) =>
        isNowBetween(t.start, t.end)
      ) || panchangData?.data?.tithi?.[0];


    const currentMuhurat =
      choghadiyaData?.data?.muhurat?.find((m: any) =>
        isNowBetween(m.start, m.end)
      ) || choghadiyaData?.data?.muhurat?.[0];
   const currentNakshatra =
      panchangData?.data?.nakshatra?.find((n: any) =>
        isNowBetween(n.start, n.end)
      ) || panchangData?.data?.nakshatra?.[0];

    return NextResponse.json({
      tithi: currentTithi?.name || "—",
      paksha: currentTithi?.paksha || "—",
      nakshatra: currentNakshatra?.name || "—",
      choghadiya: currentMuhurat
        ? `${currentMuhurat.name} (${currentMuhurat.type}) `
        : "—",
    });
  } catch (err) {
    console.error("Snapshot API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch snapshot" },
      { status: 500 }
    );
  }
}
