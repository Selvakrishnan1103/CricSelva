import { connectToMongoDb } from "@/lib/mongodb";
import Match from "@/models/Match";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    await connectToMongoDb();
    try{
        const matches = await Match.find()
        if(matches.length === 0){
            return NextResponse.json({ success : false , message : "No Matches Found"},{status:404})
        }
        return NextResponse.json({ success :true , message: "Successfully fetched Matches", matches} , { status : 200})
    }catch(error){
        return NextResponse.json({ success : false , message : error.message} , {status :500})
    }
}

export async function POST(req){
    await connectToMongoDb();
    try{
        const body = await req.json();
        const { matchName, teamA, teamB } = body || {};
        if(!matchName || !teamA || !teamB){
            return NextResponse.json({ success : false , message : "Please fill the required fields"},{ status : 400})
        }
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const match = new Match({ MatchName : matchName , createdBy : session.user.id , TeamNames : { teamA : teamA , teamB : teamB}})
        await match.save()
        
        return NextResponse.json({ success : true , message : "successfully created" , match} ,{ status : 200})
    }catch(error){
        return NextResponse.json({ success : false , message : error.message} , { status : 500})
    }
}