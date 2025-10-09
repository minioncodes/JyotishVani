import { cookies } from "next/headers";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("google_tokens")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const tokens = JSON.parse(token);
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  // console.log("calendar = ",calendar.events.get(""));
  const { data } = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });
  const events =
    data.items?.map((event) => ({
      id: event.id,
      summary: event.summary,
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
    })) || [];
  console.log("events list response:", JSON.stringify(data, null, 2));
  console.log("events = ", events);
  return NextResponse.json({ events });
}
