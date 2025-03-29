import Match from "@/models/Match"
import Player from "@/models/Player"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
import { connectToMongoDb } from "@/lib/mongodb"
export async function Get(){
    return NextResponse.json({ success : true , message : "successfully running"},{status : 200})
}
export async function PATCH(req,{ params}){

    await connectToMongoDb()
    const{ playerId, runs , wickets} = await req.json()
    
    if(!playerId){
        return NextResponse.json({ success : false , message : "No Player Found"},{ status : 400})
    }
    const session = await getServerSession(authOptions)
    if(!session || !session.user){
        return NextResponse.json({ success : false , message : "Unauthorised"} ,{ status : 401})
    }

    const player = await Player.findById(playerId)
    if(!player){
        return NextResponse.json({ success : false , message : "No Player is found"},{ status : 404})
    }
    
    const match = await Match.findById(player.matchId)
    if(!match){
        return NextResponse.json({ success : false , message : "No match Found"},{ status : 404})
    }

    if(session.user.id !== match.createdBy.toString()){
        return NextResponse.json({ success : false , message  : "the User is not the match creator"},{ status : 403})
    }

    
    if(runs < 0 || typeof runs  !== "number"){
        return NextResponse.json({ success : false , message : "Please check the wickets"},{ status : 400})
    }

    if( wickets < 0 || typeof wickets !== "number"){
        return NextResponse.json({ success : false , message : "Please check the wickets"},{ status : 400})
    }

    const updatedPlayer = await Player.findByIdAndUpdate(playerId , { runs , wickets} ,{ new : true , runValidators : true})
    if(!updatedPlayer){
        return NextResponse.json({ success : false , message : "Update failed"},{status : 400})
    }

    return NextResponse.json({ success : true ,message : "Updation success" , updatedPlayer},{ status : 200})
}