import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getgoogleClient } from "@/lib/googleClient";
import { google } from "googleapis";

export async function GET() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "select_account",
        scope: [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events.readonly"
        ],
    });
    //   console.log("auth url = ",authUrl);
    return NextResponse.json({ url: authUrl });
}
