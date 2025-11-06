import { NextResponse } from "next/server";
import LeadModel from "@/models/LeadModel";
import connectDB from "@/lib/mongo";
import { notifyEmail} from "@/lib/notify";
import { allow } from "@/lib/rateLimits";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            name,
            phoneNumber,
            dateofbirth,
            time,
            birthplace,
            service,
            concern,
            description,
            email,
        } = body;
        if (
            !name ||
            !phoneNumber ||
            !dateofbirth ||
            !time ||
            !birthplace ||
            !service ||
            !concern ||
            !description ||
            !email

        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const gate = await allow(ip, Number.POSITIVE_INFINITY);
        if (!gate.ok)
            return NextResponse.json(
                { ok: false, error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        const lead = await LeadModel.create({
            name,
            phoneNumber,
            dateofbirth,
            time,
            birthplace,
            service,
            concern,
            description,
            email,
        });
        console.log("lead from the backend = ",lead.birthplace);
        try {
            await notifyEmail(lead);
        } catch (e) {

        }
        return NextResponse.json({ success: true, data: lead }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Server error" },
            { status: 500 }
        );
    }
}
