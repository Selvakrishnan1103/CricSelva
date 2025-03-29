import { connectToMongoDb } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function GET(){
    await connectToMongoDb() ;
    try{
        const players = await User.find()
        if(!players){
            return NextResponse.json({ success : false , message : "No Players Found"},{ status : 404})
        }
        return NextResponse.json({ success : true , message : "fetched successfully" , players},{ status : 200})
    }catch(error){
        return NextResponse.json({ success : false , message : error.message},{ status : 500})
    }
}