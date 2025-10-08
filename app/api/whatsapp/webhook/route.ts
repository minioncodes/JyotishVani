import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Forbidden", { status: 403 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

 
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (messages && messages.length > 0) {
      const msg = messages[0];
      const from = msg.from; // user's WhatsApp number
      const text = msg.text?.body?.toLowerCase() || "";

      console.log("📩 Incoming message:", text);

      // 🌟 Define conditional replies
      let reply = "✨ Namaste! Welcome to JyotishWaani — your Vedic astrology guide.";

      if (text.includes("horoscope")) {
        reply = "🪐 Send me your zodiac sign (e.g. Aries, Leo, Virgo) to get today’s horoscope!";
      } else if (text.includes("aries")) {
        reply = "♈ Aries — Focus on your goals today, success is near!";
      } else if (text.includes("leo")) {
        reply = "♌ Leo — Your charm attracts opportunities today, stay confident!";
      } else if (text.includes("consult") || text.includes("booking")) {
        reply = "📅 You can book your astrology consultation here: https://jyotishwaani.in/book";
      } else if (text.includes("thanks") || text.includes("thank you")) {
        reply = "🌟 You’re most welcome! May the stars guide you always.";
      }

      // ✅ Send reply message
      await fetch(
        `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
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
        }
      );
    }

    return NextResponse.json({ status: "received" });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
