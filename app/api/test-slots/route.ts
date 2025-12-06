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
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const durationParam = searchParams.get("duration");
    console.log("duration Param = ", durationParam);
    const baseDate = dateParam ? new Date(dateParam) : new Date();
    const SLOT_DURATION_MINUTES = Number(durationParam) || 60;
    const WORK_START_HOUR = 10;
    const WORK_END_HOUR = 19;
    const dayStartIST = new Date(
      `${baseDate.toISOString().split("T")[0]}T${WORK_START_HOUR}:00:00+05:30`
    );
    const dayEndIST = new Date(
      `${baseDate.toISOString().split("T")[0]}T${WORK_END_HOUR}:59:59+05:30`
    );
    const timeMin = dayStartIST.toISOString();
    const timeMax = dayEndIST.toISOString();
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: "primary" }],
      },
    });
    // to add more fake bookings copy one of the individual object paste it above or below of 
    // one of the object and the timing here works in the 24 hour system so manipulate the timing
    // accordingly manipulate the time on which slot that you want to have for the fake bookings
    // that's it open the browser you will have the slots of the more fake bookings there
    const fakeBusy = [
      {
        start: new Date(`${baseDate.toISOString().split("T")[0]}T10:00:00+05:30`).toISOString(),
        end: new Date(`${baseDate.toISOString().split("T")[0]}T12:00:00+05:30`).toISOString()
      },
      {
        start: new Date(`${baseDate.toISOString().split("T")[0]}T18:00:00+05:30`).toISOString(),
        end: new Date(`${baseDate.toISOString().split("T")[0]}T20:00:00+05:30`).toISOString()
      },
    ];
    const busyTimes = [
      ...(freeBusy.data.calendars?.primary?.busy || []),
      ...fakeBusy
    ];
    const slots: { start: string; end: string, status: string }[] = [];
    let slotStart = new Date(dayStartIST.toISOString());
    while (slotStart < new Date(dayEndIST.toISOString())) {
      const slotEnd = new Date(new Date(slotStart).getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
      const overlap = busyTimes.some((b: any) => {
        const busyStart = new Date(b.start).getTime();
        const busyEnd = new Date(b.end).getTime();
        // skip invalid or zero-length busy intervals
        if (busyEnd <= busyStart) return false;
        // Normalize slots to UTC before comparing
        const slotStartUTC = new Date(slotStart.toISOString()).getTime();
        const slotEndUTC = new Date(slotEnd.toISOString()).getTime();

        return slotStartUTC < busyEnd && slotEndUTC > busyStart;

      });
      const slotStartTS = slotStart.getTime();
      const slotEndTS = slotEnd.getTime();
      const nowTS = Date.now();
      if (slotEndTS <= nowTS) {
        slotStart = slotEnd;
        continue;
      }
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        status: overlap ? "busy" : "free"
      });
      slotStart = slotEnd;
    }
    return NextResponse.json({ success: true, slots, durtion: SLOT_DURATION_MINUTES });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
