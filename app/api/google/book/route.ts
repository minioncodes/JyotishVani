import { NextResponse } from "next/server";
import { google } from "googleapis";

console.log("google booking route got calleddd....");
export async function POST(req: Request) {
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
        const { start, end, summary, description, attendees } = await req.json();
        console.log("attendes = ", attendees[0]);
        if (!start || !end) {
            return NextResponse.json({ error: "Missing start or end time" }, { status: 400 });
        }
        const startDate = new Date(start);
        const dayStart = new Date(startDate.setHours(0, 0, 0, 0));
        const dayEnd = new Date(startDate.setHours(23, 59, 59, 999));

        const freeBusyQuery = await calendar.freebusy.query({
            requestBody: {
                timeMin: dayStart.toISOString(),
                timeMax: dayEnd.toISOString(),
                items: [{ id: "primary" }],
            },
        });
        const busySlots = freeBusyQuery.data.calendars?.primary?.busy || [];
        console.log("All busy slots:", busySlots);
        console.log("start timing = ", start);
        console.log("end time = ", end);
        const requestedStart = new Date(start).getTime();
        const requestedEnd = new Date(end).getTime();
        const overlapping = busySlots.filter(slot => {
            if (!slot.start || !slot.end) return false;
            const busyStart = new Date(slot.start).getTime();
            const busyEnd = new Date(slot.end).getTime();
            const overlaps =
                (requestedStart < busyEnd && requestedEnd > busyStart);

            return overlaps;
        });
        if (overlapping.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Selected slot is not available",
                busySlots: overlapping,
            });
        }
        const event = {
            summary: summary || "Astrology Consultation",
            description: description || "",
            start: { dateTime: start, timeZone: "Asia/Kolkata" },
            end: { dateTime: end, timeZone: "Asia/Kolkata" },
            attendees: attendees || [],
            reminders: { useDefault: true },
            conferenceData: {
                createRequest: { requestId: `jyotishwaani-${Date.now()}` },
            },
        };
        const created = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
            sendUpdates: "all",
            conferenceDataVersion: 1,
        });
        const eventData = created.data;
        console.log("Created event:", eventData);

        return NextResponse.json({
            success: true,
            message: "Appointment booked successfully!",
            event: {
                id: eventData.id,
                summary: eventData.summary,
                start: eventData.start,
                end: eventData.end,
                meetLink: eventData.hangoutLink,
                link: eventData.htmlLink,
                attendees: eventData.attendees,
            },
        });
    } catch (error: any) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to book appointment" },
            { status: 500 }
        );
    }
}
