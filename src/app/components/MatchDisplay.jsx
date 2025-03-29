"use client" ;

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function MatchDetails(){
    const [ matches , setMatches] = useState([])
    const router = useRouter()
    useEffect(()=>{
        fetchMatches()
    },[])
    async function fetchMatches(){
        const res = await fetch("/api/match")
        if(!res.ok){
            throw new Error("Failed to fetch")
        }
        const data = await res.json()
        if(data){
            setMatches(data.matches)
        }

    }
    async function routeFunct(id){
        router.push(`/create-match/match/${id}`)
    }
    return(
        <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold text-center text-green-700 mb-4">Match List</h2>
            <ul className="divide-y divide-gray-300">
                {matches.map((match) => (
                    <li 
                        key={match._id} 
                        className="p-3 text-lg font-medium text-gray-800 bg-white rounded-md shadow-sm hover:bg-green-100 transition"
                        onClick={()=>routeFunct(match._id)}
                    >
                        {match.MatchName}
                        🏏 <span className="font-semibold text-green-600">{match.TeamNames.teamA}</span> 
                        vs 
                        <span className="font-semibold text-blue-600"> {match.TeamNames.teamB}</span> 
                    </li>
                ))}
            </ul>
        </div>

    )
}