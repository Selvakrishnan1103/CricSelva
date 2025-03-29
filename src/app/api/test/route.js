import { connectToMongoDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectToMongoDb()
        return NextResponse.json({ success : true, message: "successfully connected"},{status :200})
    }catch(error){
        return NextResponse.json({ success : false, message : error.message},{status : 500})
    }
}