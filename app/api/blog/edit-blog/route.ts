import BlogModel from "@/models/BlogModel";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
import { uploadBlogImageToCloudinary } from "@/utils/cloudinary/image-cloudinary";
export async function PATCH(req: NextRequest) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("adminToken")?.value;
        if (!token) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        }
        console.log("secret from the route = ", process.env.SECRET_KEY);
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string };
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ msg: "internal server error" }, { status: 500 });
    }
}