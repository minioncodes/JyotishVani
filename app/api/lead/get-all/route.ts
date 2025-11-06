import { NextResponse } from "next/server";
import LeadModel from "@/models/LeadModel";
import connectDB from "@/lib/mongo";

export async function GET(req: Request) {
  try {
    await connectDB();
    const response=await LeadModel.find({});
    return NextResponse.json({response});
  }catch(e){
    return NextResponse.json({err:"somethign went wrong"},{status:500});
  }
}