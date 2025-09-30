import BlogModel from "@/models/BlogModel";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { uploadBlogImageToCloudinary } from "@/utils/cloudinary/image-cloudinary";

export async function PATCH(
    req: NextRequest,
    context: any
) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;
    if (!token) {
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as { id: string };
    const formData = await req.formData();
    const blogId = formData.get("blogId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;
    if (!blogId) {
      return NextResponse.json({ msg: "Blog ID required" }, { status: 400 });
    }
    let imageUrl;
    if (imageFile) {
      const uploaded = await uploadBlogImageToCloudinary(imageFile, "blogs");
      imageUrl = uploaded.secure_url;
    }
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: blogId, adminId: decoded.id }, 
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );
    if (!updatedBlog) {
      return NextResponse.json({ msg: "blog not found or not yours" }, { status: 404 });
    }
    return NextResponse.json({ updatedBlog }, { status: 200 });
  } catch (e) {
    console.error("err updating blogssss", e);
    return NextResponse.json({ msg: "internal server error" }, { status: 500 });
  }
}
