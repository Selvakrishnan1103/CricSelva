import { connectToMongoDb } from "@/lib/mongodb";
import Match from "@/models/Match";
import Player from "@/models/Player";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function GET(req) {
    await connectToMongoDb();
    try{
        const { searchParams } = new URL(req.url)
        const matchId = searchParams.get("matchId")
        const isValidMatch = await Match.findById(matchId)
        if(!isValidMatch){
            return NextResponse.json({ success : false , message : "No Match found"} ,{ status : 400})
        }
        const players = await Player.find({ matchId}).populate("userId")
        if(players.length === 0){
            return NextResponse.json({ success : false , message : "There is no player in the match"},{ status : 400})
        }
        return NextResponse.json({ success : true , message : "Players successfully retrieved",players},{ status : 200})
    }catch(error){
        return NextResponse.json({ success : false , message : error.meesage},{ status : 500})
    }    
}


export async function POST(req){
    await connectToMongoDb();
    try{
        const { matchId , userId , team} = await req.json()
        const isValidMatch = await Match.findById(matchId)
        if(!isValidMatch){
            return NextResponse.json({ success : false , message : "No Match found"} ,{ status : 404})
        }
        const isNoUser = await User.findById(userId)
        if(!isNoUser){
            return NextResponse.json({ success : false , message : "Invalid User"} , {status : 404})
        }
        const existingPlayer = await Player.findOne({ matchId, userId})
        if(existingPlayer){
            return NextResponse.json({ success : false , message : " Player already in the Match"},{ status : 400})
        }
        const newPlayer = new Player({ userId : userId , matchId : matchId , team : team })
        await newPlayer.save()
        
        return NextResponse.json({ success : true , message : "Player Added successfully"} , { status : 201})
    }catch(error){
        return NextResponse.json({ success : false , message : error.message},{ status : 500})
    }
}