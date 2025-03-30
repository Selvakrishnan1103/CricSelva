"use client" ;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AddPlayers(){
    const [players, setPlayers] = useState([])
    const matchId = useSelector((state) => state.match.matchId)
    const router = useRouter()
    console.log(matchId)
    useEffect(()=>{
        fetchPlayers();
    },[])
    async function fetchPlayers(){
        try{
            const res = await fetch("/api/allplayers")
            if(!res.ok){
                throw new Error("Failed to Fetch")
            }
            const data = await res.json()
            setPlayers(data.players)
        }catch(error){
            console.log(error.message)
        }
    }

    async function teamAPlayers({id}) {
        try{
            const res = await fetch('/api/players',{
                method : "POST",
                headers : {"Content-Type" : "application/json"} ,
                body : JSON.stringify({ matchId : matchId , userId : id , team : "teamA"})
            })
            const data = await res.json()
            console.log(data.message)
            alert("Player Added Successfully")
        }catch(error){
            console.error(error.message)
        }
    }
    
    async function teamBPlayers({id}) {
        try{
            const res = await fetch('/api/players',{
                method : "POST",
                headers : {"Content-Type" : "application/json"} ,
                body : JSON.stringify({ matchId : matchId , userId : id , team : "teamB"})
            })
            const data = await res.json()
            console.log(data.message)
            alert("Player Added Successfully")
        }catch(error){
            console.error(error.message)
        }
    }
    function MatchDetailsPage(){
        router.push(`/create-match/match/${matchId}/update-player`)
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-5">
                <h1 className="text-2xl font-bold text-green-600">Team Selection</h1>
                <br />
                <ul className="h-80 w-full p-4 overflow-y-scroll border border-green-600">
                    {players.map((player) => (
                        <li
                            key={player._id}
                            className="flex gap-5 p-3 border-b border-green-600 text-green-600"
                        >
                            <h1 className="w-30 flex-grow">{player.name}</h1>
                            <button
                                onClick={() => teamAPlayers({ id: player._id })}
                                className="p-2 border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white"
                            >
                                Team A
                            </button>
                            <button
                                onClick={() => teamBPlayers({ id: player._id })}
                                className="p-2 border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white"
                            >
                                Team B
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full p-4">
                <button
                    onClick={MatchDetailsPage}
                    className="p-2 border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white"
                >
                    Save
                </button>
            </div>
        </div>

        
    )
}