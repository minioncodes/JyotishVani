import { NextRequest, NextResponse } from "next/server";

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

// 🌙 Chatbot logic
async function generateAstroReply(text: string): Promise<string> {
  const msg = text.toLowerCase().trim();

  // Greetings
  if (["hi", "hello", "hey", "namaste"].some((g) => msg.includes(g))) {
    return "🌟 Namaste! I’m *JyotishVani*, your cosmic guide.\n\nType your *zodiac sign* (like Aries, Virgo, Scorpio) to get today’s horoscope ✨";
  }

  // Zodiac recognition
  const sign = zodiacSigns.find((z) => msg.includes(z));
  if (sign) {
    return await getHoroscope(sign);
  }

  // Remedies
  if (msg.includes("remedy") || msg.includes("solution")) {
    return "💫 Remedies vary by your planetary position, but a good start is to wear your ruling gemstone and chant your Moon mantra. Type your *zodiac sign* for personalized guidance.";
  }

  // Lucky color
  if (msg.includes("color") || msg.includes("lucky")) {
    return "🎨 Type your zodiac sign (e.g., Leo or Aquarius) and I’ll tell you today’s *lucky color*!";
  }

  // Default fallback
  return "🔮 I can tell you your horoscope, lucky color, or remedies.\nType *Hi* to start or send your zodiac sign ✨";
}

// ✅ WEBHOOK HANDLER
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    console.log("✅ Webhook verified.");
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📩 Incoming message:", JSON.stringify(body, null, 2));

    const change = body.entry?.[0]?.changes?.[0]?.value;
    const message = change?.messages?.[0];
    const from = message?.from;
    const text = message?.text?.body;

    if (from && text) {
      console.log(`💬 Message from ${from}: ${text}`);

      // 🔮 Generate astrology-based reply
      const reply = await generateAstroReply(text);

      // ✉️ Send reply via WhatsApp API
      await fetch(`https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`, {
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
    }

    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("⚠️ Webhook error:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
