import { google } from "googleapis";
import { NextResponse } from "next/server";

/*
if you are new to this code than i want to clear something before you scroll down:
- In this code there is nothing that needs to be changed what you only need is the 
  route - /api/auth over there we will get the token once the callback finished
- Inside that token you will get the refresh_token (log the token for better overview
  what token has) grab it put it in the env and it is ready to go.
*/

function ist(date: Date) {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  return new Date(date.getTime() + IST_OFFSET);
}

function fromIST(date: Date) {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  return new Date(date.getTime() - IST_OFFSET);
}
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
    console.log("refresh token = ", process.env.GOOGLE_REFRESH_TOKEN);
    console.log("google client id = ", process.env.GOOGLE_CLIENT_ID);
    console.log("google client secret = ", process.env.GOOGLE_CLIENT_SECRET);
    console.log("redirect uri = ", process.env.GOOGLE_REDIRECT_URI);
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const durationParam = searchParams.get("duration");
    console.log("duration Param = ", durationParam);
    const baseDate = dateParam ? new Date(dateParam) : new Date();
    const SLOT_DURATION_MINUTES = Number(durationParam) || 60;
    const WORK_START_HOUR = 14;
    const WORK_END_HOUR = 22;
    const baseDateRaw = dateParam ? new Date(dateParam) : new Date();
    const baseIST = ist(baseDateRaw);
    const dayStartIST = new Date(baseIST);
    dayStartIST.setHours(WORK_START_HOUR, 0, 0, 0);
    const dayEndIST = new Date(baseIST);
    dayEndIST.setHours(WORK_END_HOUR, 59, 59, 999);
    const timeMin = fromIST(dayStartIST).toISOString();
    const timeMax = fromIST(dayEndIST).toISOString();
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: "primary" }],
      },
    });
    const busyTimes = freeBusy.data.calendars?.primary?.busy || [];
    const slots: { start: string; end: string }[] = [];
    let slotStart = new Date(dayStartIST);
    while (slotStart < dayEndIST) {
      const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
      if (slotEnd > dayEndIST) break;
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
    return NextResponse.json({ success: true, slots, durtion: SLOT_DURATION_MINUTES });
  } catch (error: any) {
    console.log("error message = ", error.response);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
