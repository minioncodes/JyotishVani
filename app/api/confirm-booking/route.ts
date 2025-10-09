import { cookies } from "next/headers";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("google_tokens"); 
  if (!token) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const tokens = JSON.parse(token.value);
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials(tokens);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const { slot, paymentId } = await req.json();
  const event = {
    summary: "Booked Slot",
    description: `Payment ID: ${paymentId}`,
    start: { dateTime: new Date(slot.start).toISOString(), timeZone: "Asia/Kolkata" },
    end: { dateTime: new Date(slot.end).toISOString(), timeZone: "Asia/Kolkata" },
  };
  await calendar.events.insert({ calendarId: "primary", requestBody: event });
  return NextResponse.json({ success: true });
}
