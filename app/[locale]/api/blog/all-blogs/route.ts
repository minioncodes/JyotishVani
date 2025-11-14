import connectDB from "@/lib/mongo";
import BlogModel from "@/models/BlogModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const blogs = await BlogModel.find();
    return NextResponse.json({ msg: "successful", blogs }, { status: 200 });
  } catch (e: unknown) {
    console.error("Error fetching blogs:", e);
    return NextResponse.json(
      { msg: "Error in fetching all the blogs" },
      { status: 500 }
    );
  }
}
