import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminModel from "@/models/AdminModel";
import connectDB from "@/lib/mongo";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const cookiestore = await cookies();
        const { email, password } = await req.json();
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }
        const adminToken = jwt.sign(
            { email: admin.email, id: admin._id },
            process.env.SECRET_KEY as string,
            { expiresIn: "7d" }
        );
        const res = NextResponse.json({
            message: "Login successful",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
            token: adminToken,
        });
        cookiestore.set("adminToken", adminToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/",
        });
        return res;
    } catch (error) {
        console.error("Error in signin:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
