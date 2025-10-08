import { NextRequest, NextResponse } from "next/server";

// ✅ Send message to any WhatsApp number via Cloud API
export async function POST(req: NextRequest) {
  try {
    const { to, message } = await req.json();

    const res = await fetch(
      `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        }),
      }
    );

    const data = await res.json();
    console.log("✅ Message sent:", data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Send message error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
