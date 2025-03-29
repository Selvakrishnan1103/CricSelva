"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


export default function MatchDetailsButton(){
    const router = useRouter()
    const matchId = useSelector((state) => state.match.matchId)
    function Matchdetails(){
        
        router.push(`/match/${matchId}`)
    }
    return(
        <button onClick={Matchdetails} className="p-4 border-2 border-blue-600" disabled={!matchId}>Match Details</button>
    )
}