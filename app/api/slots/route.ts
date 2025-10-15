import { google } from "googleapis";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("google_tokens");
  console.log("tokenCookie = ", tokenCookie);
  if (!tokenCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const tokens = JSON.parse(tokenCookie.value);
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oAuth2Client.setCredentials(tokens);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const now = new Date();
  const timeMax = new Date();
  timeMax.setDate(now.getDate() + 7);
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: now.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items || [];
  const availableSlots = events.map(event => ({
    id: event.id,
    start: event.start?.dateTime || event.start?.date || "",
    end: event.end?.dateTime || event.end?.date || "",
    title: event.summary || "Untitled",
  }));
  return NextResponse.json({ slots: availableSlots });
}
