import { NextRequest, NextResponse } from "next/server";

// ♈️ Zodiac signs for horoscope detection
const zodiacSigns = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

// 🔮 Fetch daily horoscope
async function getHoroscope(sign: string): Promise<string> {
  try {
    const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
      method: "POST",
    });
    const data = await res.json();
    return `✨ *${sign.toUpperCase()}* — ${data.description}\n\n🌈 *Lucky Color:* ${data.color}\n🔢 *Lucky Number:* ${data.lucky_number}\n💫 *Mood:* ${data.mood}`;
  } catch {
    return "🌌 Sorry, the stars seem quiet right now. Try again later.";
  }
}   

// 🌠 Generate bot reply text based on message
async function generateAstroReply(text: string): Promise<string> {
  const msg = text.toLowerCase().trim();

  if (["hi","Hi","Hii", "hii", "hello", "hey", "namaste"].some((g) => msg.includes(g))) {
    return "🌟 Namaste! I’m *JyotishWaani*, your cosmic guide.\n\nType your *zodiac sign* (like Aries, Virgo, Scorpio) to get today’s horoscope ✨";
  }

  const sign = zodiacSigns.find((z) => msg.includes(z));
  if (sign) {
    return await getHoroscope(sign);
  }

  if (msg.includes("remedy") || msg.includes("solution")) {
    return "💫 Remedies vary by your planetary position, but a good start is to wear your ruling gemstone and chant your Moon mantra. Type your *zodiac sign* for personalized guidance.";
  }

  if (msg.includes("color") || msg.includes("lucky")) {
    return "🎨 Type your zodiac sign (e.g., Leo or Aquarius) and I’ll tell you today’s *lucky color*! 🌈";
  }

  return "🔮 I can tell you your horoscope, lucky color, or remedies.\nType *Hi* to start or send your zodiac sign ✨";
}

// ✅ VERIFY webhook (Meta GET request)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    console.log("🔍 Mode:", mode);
    console.log("🔍 Token from Meta:", token);
    console.log("🔍 Challenge:", challenge);

    if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
      console.log("✅ Webhook verified successfully!");
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.warn("❌ Verification failed: invalid token or mode");
      return new NextResponse("Forbidden", { status: 403 });
    }
  } catch (err) {
    console.error("❌ Webhook verification error:", err);
    return new NextResponse("Server Error", { status: 500 });
  }
}

// ✅ HANDLE incoming WhatsApp messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📩 Incoming webhook:", JSON.stringify(body, null, 2));

    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const from = message?.from;
    const text = message?.text?.body;

    if (!from || !text) {
      console.log("⚪ No message body detected, skipping...");
      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    }

    console.log(`💬 Message from ${from}: ${text}`);

    // Generate dynamic astrology-based reply
    const reply = await generateAstroReply(text);

    // 🟢 Send auto-reply via WhatsApp API
    const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: from,
        type: "text",
        text: { body: reply },
      }),
    });

    const textRes = await res.text();
    console.log("📤 WhatsApp API status:", res.status);
    console.log("📤 WhatsApp API response:", textRes);

    if (!res.ok) {
      console.error("⚠️ Failed to send reply. Check token, permissions, or 24h window.");
    }
    
    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("⚠️ Webhook error:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
