import BlogModel from "@/models/BlogModel";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
import { uploadBlogImageToCloudinary } from "@/utils/cloudinary/image-cloudinary";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("adminToken")?.value;
        if (!token) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string };
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("image") as File | null;
        // if (!title || !description) {
        //     return NextResponse.json({ msg: "missing fileds" }, { status: 400 });
        // }
        let imageUrl = "";
        if (imageFile) {
            const uploaded = await uploadBlogImageToCloudinary(imageFile, "blogs");
            imageUrl = uploaded;
        }
        const newBlog = await BlogModel.create({
            adminId: decoded.id,
            title,
            description,
            image:imageUrl
        })

        return NextResponse.json({ newBlog }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ msg: "there is an error on this code" }, { status: 500 });
    }
}