import connectDB from "@/lib/mongo";
import BlogModel from "@/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        await connectDB();
        const blogs=await BlogModel.find({});
        console.log("blog from the get routes = ",blogs);
        return NextResponse.json({msg:"succesfull",blogs},{status:200});
    }catch(e:any){
        console.log(e.message);
        return NextResponse.json({msg:"err in fetching all the blogs"},{status:500});
    }
}