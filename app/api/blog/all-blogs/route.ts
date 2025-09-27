import connectDB from "@/lib/mongo";
import BlogModel from "@/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        await connectDB();
        const blogs=await BlogModel.find();
        return NextResponse.json({msg:"succesfull",blogs},{status:200});
    }catch(e:any){
        return NextResponse.json({msg:"err in fetching all the blogs"},{status:500});
    }
}