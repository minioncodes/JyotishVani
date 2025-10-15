import { NextResponse } from "next/server";
import { google } from "googleapis";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("google_tokens");
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
        const { start, end, summary, description, attendees } = await req.json();
        console.log("start =", start);
        console.log("end =", end);
        console.log("attendes = ", attendees[0]);
        if (!start || !end) {
            return NextResponse.json({ error: "Missing start or end time" }, { status: 400 });
        }
        const freeBusyQuery = await calendar.freebusy.query({
            requestBody: {
                timeMin: new Date(start).toISOString(),
                timeMax: new Date(end).toISOString(),
                items: [{ id: "primary" }],
            },
        });
        console.log("time min = ", new Date(start).toISOString())
        console.log("time max = ", new Date(end).toISOString())
        const busySlots = freeBusyQuery.data.calendars?.primary?.busy || [];
        if (busySlots.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Selected slot is not available",
                busySlots,
            });
        }
        const event = {
            summary: summary || "New Appointment",
            description: description || "",
            start: { dateTime: start, timeZone: "Asia/Kolkata" },
            end: { dateTime: end, timeZone: "Asia/Kolkata" },
            attendees: attendees || [],
            reminders: { useDefault: true },
        };
        const created = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
            sendUpdates: "all",
            conferenceDataVersion: 1
        } as any);
        const eventData = created.data;
        console.log("Created event =", created.data);
        return NextResponse.json({
            success: true,
            message: "Appointment booked successfully!",
            event: created.data,
        });
    } catch (error: any) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to book appointment" },
            { status: 500 }
        );
    }
}
