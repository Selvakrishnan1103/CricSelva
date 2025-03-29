import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToMongoDb } from "@/lib/mongodb";

export async function GET() {
    try {
        await connectToMongoDb;

        
        const topBatsmen = await User.find({})
            .sort({ "score.runs": -1 }) 
            .limit(5);

        const topBowlers = await User.find({})
            .sort({ "score.wickets": -1 }) 
            .limit(5);

        return NextResponse.json({ topBatsmen, topBowlers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
