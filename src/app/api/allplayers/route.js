import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";

export async function GET(){
    await connectToMongoDb();
    try{
        const players = await User.find()
        if(players.length === 0){
            return NextResponse.json({ success : false , message : "No players Found"},{ status : 400})
        }
        return NextResponse.json({ success : true , message : "Successfully loaded Players" , players},{status : 200})
    }catch(error){
        return NextResponse.json({ success : false , message : error.message},{ status :500})
    }
}