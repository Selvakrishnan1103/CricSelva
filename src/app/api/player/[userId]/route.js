import { connectToMongoDb } from "@/lib/mongodb";
import Player from "@/models/Player";
import Match from "@/models/Match";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req, { params }) {
    await connectToMongoDb();
    const { userId } = params;

    try {
        const player = await Player.find({ userId }).populate("userId").populate("matchId");
        if (!player) {
            return NextResponse.json({ success: false, message: "Player not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, player }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    await connectToMongoDb();
    
    const { userId , runs, wickets } = await req.json();

    try {
    
        const updatedPlayer = await User.findByIdAndUpdate(
            userId,
            { 
                $inc: { "score.runs": runs, "score.wickets": wickets }
            },
            { new: true }
        );

        if (!updatedPlayer) {
            return NextResponse.json({ error: "Player not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Player stats updated", player: updatedPlayer }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
