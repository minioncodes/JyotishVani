import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to, message } = await req.json();
    const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    console.log("📤 Sending message to:", to);
    console.log("📤 Endpoint:", url);

    const res = await fetch(url, {
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
    });

    const textRes = await res.text();
    console.log("📤 Status:", res.status);
    console.log("📤 Raw response:", textRes);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send", status: res.status, meta: textRes },
        { status: res.status }
      );
    }

    return NextResponse.json(JSON.parse(textRes));
  } catch (err) {
    console.error("❌ Send message error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
