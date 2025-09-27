import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import AdminModel from "@/models/AdminModel";
import connectDB from "@/lib/mongo";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.create({
      name,
      email,
      password: hashPassword,
      createdAt: new Date(),
    });
    return NextResponse.json(
      {
        message: "Admin registered successfully",
        admin: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("error in signup:", error);
    return NextResponse.json(
      { message: "internal Server Error" },
      { status: 500 }
    );
  }
}