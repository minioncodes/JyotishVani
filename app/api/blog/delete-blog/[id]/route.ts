import BlogModel from "@/models/BlogModel";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("adminToken")?.value;
        if (!token) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 401 })
        }
        const blogId = params.id;
        if (!blogId) {
            return NextResponse.json({ msg: "blog ID is required" }, { status: 400 });
        }
        const deletedBlog = await BlogModel.deleteOne({ _id: blogId });
        if (deletedBlog.deletedCount === 0) {
            return NextResponse.json({ msg: "blog not found" }, { status: 404 });
        }
        return NextResponse.json({ msg: "blog is deleted succesfully" }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ msg: "internal server err" }, { status: 500 });
    }
}