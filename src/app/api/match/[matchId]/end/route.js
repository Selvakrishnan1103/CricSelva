import { connectToMongoDb } from "@/lib/mongodb";
import Match from "@/models/Match";
import { NextResponse } from "next/server";

export async function PATCH(req){
    await connectToMongoDb();

    
    try{
        const { matchId } = await req.json()
        if(!matchId){
            return NextResponse.json({ success : false , message : "Match Not Found" } , { status : 400})
        }
        const updatedMatch = await Match.findByIdAndUpdate( matchId , { status : "completed"} , {new : true})
        if(!updatedMatch){ 
            return NextResponse.json({ success : false , message:" Failed to update the match Status"} ,{ status : 400})
        }
        return NextResponse.json({ success : true , message : "Successfully Updated" , updatedMatch},{ status :200})
    }catch(error){
        return NextResponse.json({ success : false , message : error.message} ,{ status : 500})
    }
}