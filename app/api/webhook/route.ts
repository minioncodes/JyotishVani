import { NextRequest, NextResponse } from "next/server";
import { generateAstroReply } from "@/lib/botLogic";

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v20.0";
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const WA_TOKEN = process.env.WHATSAPP_TOKEN!;
const WA_URL = `https://graph.facebook.com/${GRAPH_VERSION}/${PHONE_ID}/messages`;

// Verify webhook
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN)
    return new NextResponse(challenge, { status: 200 });

  return new NextResponse("Forbidden", { status: 403 });
}

// Send typing indicator
async function sendTypingOn(to: string) {
  try {
    await fetch(WA_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "action",
        status: "typing_on",
      }),
    });
  } catch (err) {
    console.warn(" Typing indicator failed:", err);
  }
}

// Send WhatsApp messages
async function sendWhatsAppMessage(to: string, type: string, payload: any) {
  const body =
    type === "text"
      ? { messaging_product: "whatsapp", to, type: "text", text: payload }
      : {
          messaging_product: "whatsapp",
          to,
          type: "interactive",
          interactive: { type: "button", ...payload },
        };

  const res = await fetch(WA_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  console.log(" WA:", res.status, text);
}

// Handle incoming webhook
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const from = msg?.from;
    if (!from) return NextResponse.json({ ok: true });

    const text =
      msg.text?.body ||
      msg.interactive?.button_reply?.title ||
      msg.interactive?.list_reply?.title ||
      "";

    if (!text) return NextResponse.json({ ok: true });

    console.log(` ${from}: ${text}`);

    // Simulate typing...
    await sendTypingOn(from);
    await new Promise((r) => setTimeout(r, 1500));

    const { type, payload } = await generateAstroReply(text);
    await sendWhatsAppMessage(from, type, payload);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(" Webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
