import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function getgoogleClient(){
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    )
}