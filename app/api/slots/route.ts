import { google } from "googleapis";
import { NextResponse } from "next/server";

/*
if you are new to this code than i want to clear something before you scroll down:
- In this code there is nothing that needs to be changed what you only need is the 
  route - /api/auth over there we will get the token once the callback finished
- Inside that token you will get the refresh_token (log the token for better overview
  what token has) grab it put it in the env and it is ready to go.
*/

export async function GET(req: Request) {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const durationParam = searchParams.get("duration");
    console.log("duration Param = ",durationParam);
    const baseDate = dateParam ? new Date(dateParam) : new Date();
    const SLOT_DURATION_MINUTES = Number(durationParam) || 60;
    const WORK_START_HOUR = 8;
    const WORK_END_HOUR = 22;
    const dayStart = new Date(baseDate);
    dayStart.setHours(WORK_START_HOUR, 0, 0, 0);
    const dayEnd = new Date(baseDate);
    dayEnd.setHours(WORK_END_HOUR, 59, 59, 999);
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        items: [{ id: "primary" }],
      },
    });
    const busyTimes = freeBusy.data.calendars?.primary?.busy || [];
    const slots: { start: string; end: string }[] = [];
    let slotStart = new Date(dayStart);
    while (slotStart < dayEnd) {
      const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
      if (slotEnd > dayEnd) break;
      const overlap = busyTimes.some((b: any) => {
        const busyStart = new Date(b.start).getTime();
        const busyEnd = new Date(b.end).getTime();
        return slotStart.getTime() < busyEnd && slotEnd.getTime() > busyStart;
      });
      if (slotEnd <= new Date()) {
        slotStart = slotEnd;
        continue;
      }
      if (!overlap) {
        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
        });
      }
      slotStart = slotEnd;
    }
    return NextResponse.json({ success:true,slots,durtion:SLOT_DURATION_MINUTES});
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
