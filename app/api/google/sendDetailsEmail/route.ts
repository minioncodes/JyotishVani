import { sendPaymentDetailsEmail } from "@/lib/sendPayementConfirmationEmail";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    try{
        const body=await req.json();
        await sendPaymentDetailsEmail(body);
        console.log("body = ",body);
        return NextResponse.json({success:true},{status:200});
    }catch(e:any){
        return NextResponse.json({success:false},{status:500});
    }
}