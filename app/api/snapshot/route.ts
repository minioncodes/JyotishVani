import { NextResponse } from "next/server";

// ---- 🧠 Global in-memory cache (persists while server is running) ----
let cachedToken: string | null = null;
let tokenExpiry = 0; // Unix timestamp (ms)

// ---- 🔑 Helper: Fetch and cache Access Token ----
async function getAccessToken() {
  const now = Date.now();

  // ✅ Reuse token if it's still valid
  if (cachedToken && now < tokenExpiry) {
    console.log("♻️ Using cached token (valid until)", new Date(tokenExpiry).toLocaleTimeString());
    return cachedToken;
  }

  console.log("🔑 Requesting new Prokerala access token...");
  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID || "",
      client_secret: process.env.PROKERALA_CLIENT_SECRET || "",
    }),
    cache: "no-store",
  });

  console.log("🔎 Token fetch response:", res.status, res.statusText);
  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Token fetch failed:", res.status, text);
    throw new Error(`Token fetch failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000; // refresh 1 min before expiry
  console.log("✅ New token cached until", new Date(tokenExpiry).toLocaleTimeString());
  return cachedToken;
}

// ---- 🕒 Helper: Check if now between start and end ----
function isNowBetween(start: string, end: string): boolean {
  const now = new Date();
  return now >= new Date(start) && now <= new Date(end);
}

// ---- 🚀 Main GET Handler ----
export async function GET() {
  try {
    console.log("🚀 Starting snapshot API request...");

    const token = await getAccessToken();
    console.log("🔐 Using token:", token?.slice(0, 10) + "...");

    const now = new Date();
    const datetime = now.toISOString().split(".")[0] + "+05:30";
    const coordinates = "28.6139,77.2090";
    const encodedDatetime = encodeURIComponent(datetime);

    console.log("📅 Current datetime:", datetime);
    console.log("📍 Coordinates:", coordinates);

    const fetchOpts = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store" as RequestCache,
    };

    // 🌅 Fetch Panchang
    console.log("🌅 Fetching Panchang data...");
    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    );
    console.log("🔎 Panchang response:", panchangRes.status, panchangRes.statusText);

    if (!panchangRes.ok) {
      const text = await panchangRes.text();
      console.error("❌ Panchang fetch failed:", panchangRes.status, text);
      throw new Error(`Panchang fetch failed: ${panchangRes.status}`);
    }

    const panchangData = await panchangRes.json();
    console.log("✅ Panchang data received.");

    // 🪐 Fetch Choghadiya
    console.log("🪐 Fetching Choghadiya data...");
    const choghadiyaRes = await fetch(
      `https://api.prokerala.com/v2/astrology/choghadiya?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDatetime}`,
      fetchOpts
    );
    console.log("🔎 Choghadiya response:", choghadiyaRes.status, choghadiyaRes.statusText);

    if (!choghadiyaRes.ok) {
      const text = await choghadiyaRes.text();
      console.error("❌ Choghadiya fetch failed:", choghadiyaRes.status, text);
      throw new Error(`Choghadiya fetch failed: ${choghadiyaRes.status}`);
    }

    const choghadiyaData = await choghadiyaRes.json();
    console.log("✅ Choghadiya data received.");

    // 📊 Parse snapshot data
    const currentTithi =
      panchangData?.data?.tithi?.find((t: any) =>
        isNowBetween(t.start, t.end)
      ) || panchangData?.data?.tithi?.[0];

    const currentNakshatra =
      panchangData?.data?.nakshatra?.find((n: any) =>
        isNowBetween(n.start, n.end)
      ) || panchangData?.data?.nakshatra?.[0];

    const currentMuhurat =
      choghadiyaData?.data?.muhurat?.find((m: any) =>
        isNowBetween(m.start, m.end)
      ) || choghadiyaData?.data?.muhurat?.[0];

    console.log("🪔 Snapshot summary:");
    console.log("   Tithi:", currentTithi?.name, "| Paksha:", currentTithi?.paksha);
    console.log("   Nakshatra:", currentNakshatra?.name);
    console.log("   Choghadiya:", currentMuhurat?.name, `(${currentMuhurat?.type})`);

    return NextResponse.json(
      {
        tithi: currentTithi?.name || "—",
        paksha: currentTithi?.paksha || "—",
        nakshatra: currentNakshatra?.name || "—",
        choghadiya: currentMuhurat
          ? `${currentMuhurat.name} (${currentMuhurat.type})`
          : "—",
        updatedAt: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    console.error("❌ Snapshot API error:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch live snapshot", details: err.message },
      { status: 500 }
    );
  }
}
