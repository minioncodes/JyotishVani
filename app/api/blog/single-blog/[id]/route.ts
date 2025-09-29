import BlogModel from "@/models/BlogModel";
import connectDB from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: any
) {
  try {
    await connectDB();
    const id  = await context.params.id;

    if (!id) {
      return NextResponse.json({ msg: "Blog ID is required" }, { status: 400 });
    }
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (e) {
    console.error("Error fetching blog:", e);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
