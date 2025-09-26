import BlogModel from "@/models/BlogModel";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
import { uploadBlogImageToCloudinary } from "@/utils/cloudinary/image-cloudinary";
console.log("crete blog got calleddd!");
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("adminToken")?.value;
        if (!token) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        }
        console.log("token = ",token);
        console.log("secret from the route = ", process.env.SECRET_KEY);
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string };
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("image") as File | null;
        console.log("formdata = ",formData);
        // if (!title || !description) {
        //     return NextResponse.json({ msg: "missing fileds" }, { status: 400 });
        // }
        let imageUrl = "";
        if (imageFile) {
            const uploaded = await uploadBlogImageToCloudinary(imageFile, "blogs");
            console.log("uploaded = ",uploaded);
            imageUrl = uploaded.secure_url;
        }
        const newBlog = await BlogModel.create({
            adminId: decoded.id,
            title,
            description,
            image:imageUrl
        })
        console.log("new Blog = ", newBlog);
        return NextResponse.json({ newBlog }, { status: 201 })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ msg: "there is an error on this code" }, { status: 500 });
    }
}