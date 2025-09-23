import AdminModel from "@/models/AdminModel";
import BlogModel from "@/models/BlogModel";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
console.log("crete blog got calleddd!");
export async function POST(req:NextRequest){
    try{
        await connectDB();
        const cookieStore=await cookies();
        const token=cookieStore.get("adminToken")?.value;
        if(!token){
            return NextResponse.json({msg:"unauthorized"},{status:401});
        }
        console.log("secret from the route = ",process.env.SECRET);
        const {title,description,image}=await req.json();
        if(!title || !description){
            return NextResponse.json({msg:"missing fileds"},{status:400});
        }
        const decoded=jwt.verify(token,process.env.SECRET_KEY as string) as {id:string};
        console.log("decoded = ",decoded.id);
        const newBlog=await BlogModel.create({
            adminId:decoded.id,
            title,
            description,
            image
        })
        console.log("new Blog = ",newBlog);
        return NextResponse.json({newBlog},{status:201})
    }catch(e:any){
        console.log(e);
        return NextResponse.json({msg:"there is an error on this code"},{status:500});
    }
}