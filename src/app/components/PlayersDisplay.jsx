"use client" ;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PlayersDisplay(){
    const [players, setPlayers] = useState([])
    const [ updatedMatch , setUpdatedMatch] =useState([])
    const matchId = useSelector((state)=> state.match.matchId)
    useEffect(()=>{
        fetchMatchPlayers();
        
    },[])
    
    async function fetchMatchPlayers(){
        try{
            const res = await fetch(`/api/players?matchId=${matchId}`)
            if(!res.ok){
                throw new Error("Failed to Fetch")
            }
            const data = await res.json()
            console.log(data.players)
            setPlayers(data.players)
        }catch(error){
            console.error(error.message)
        }
    }
    const teamStats = {
        "teamA" : { totalRuns :0 , totalWickets :0 },
        "teamB" : { totalRuns :0 , totalWickets :0 }
    }
    players.forEach(player => {
        if (teamStats[player.team]) {
          teamStats[player.team].totalRuns += player.runs;
          teamStats[player.team].totalWickets += player.wickets;
        }
    });

    async function endMatch(){
        try{
            const res = await fetch(`/api/match/${matchId}/end`,{
                method : "PATCH",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({ matchId})

            })
            if(!res.ok){
                throw new Error("failed to Fetch")
            }

            const data = await res.json()
            setUpdatedMatch(data.updatedMatch)
            console.log(data.updatedMatch)
        }catch(error){
            console.error(error.message)
        }
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <div>
                <h1 className="text-white bg-green-600 font-bold text-xl p-4 mt-3">Team A  {teamStats["teamA"].totalRuns} - {teamStats["teamA"].totalWickets}</h1>
                <h1 className="text-white bg-green-600 font-bold text-xl p-4 mt-3">Team B  {teamStats["teamB"].totalRuns} - {teamStats["teamB"].totalWickets}</h1>
            </div>
            <div className="grid grid-rows-2 gap-4 flex mt-5">
                
                <div className=" flex flex-col justify-center items-center gap-3 ">
                    <h1 className="text-2xl font-bold text-green-600">Team A</h1>
                    <ul>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-green-700 text-white">
                                <th className="border border-gray-300 p-2">Player Name</th>
                                <th className="border border-gray-300 p-2">Runs</th>
                                <th className="border border-gray-300 p-2">Wickets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.filter(player => player.team === "teamA").map(player => (
                                <tr key={player._id} className="bg-green-600 text-white font-semibold">
                                    <td className="border border-gray-300 p-2">{player.userId.name}</td>
                                    <td className="border border-gray-300 p-2 text-center">{player.runs}</td>
                                    <td className="border border-gray-300 p-2 text-center">{player.wickets}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>

                    </ul>
                </div>
                <div className=" flex flex-col justify-center items-center gap-3 mb-5">
                    <h1 className="text-2xl font-bold text-green-600">Team B</h1>
                    <ul>
                        <table className="w-full border-collapse border border-gray-300">
                            
                            <thead>
                                <tr className="bg-green-700 text-white">
                                <th className="border border-gray-300 p-2">Player Name</th>
                                <th className="border border-gray-300 p-2">Runs</th>
                                <th className="border border-gray-300 p-2">Wickets</th>
                                </tr>
                            </thead>

                            
                            <tbody>
                                {players.filter(player => player.team === "teamB").map(player => (
                                <tr key={player._id} className="bg-green-600 text-white font-semibold">
                                    <td className="border border-gray-300 p-2">{player.userId.name}</td>
                                    <td className="border border-gray-300 p-2 text-center">{player.runs}</td>
                                    <td className="border border-gray-300 p-2 text-center">{player.wickets}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </ul>
                </div>           
            </div>
            <div>
                <button onClick={endMatch} className="mt-5 p-4 bg-green-600 text-white font-bold text-xl rounded-lg mb-5">End Match</button>
            </div>
            {updatedMatch.status === "completed" && (
                <div className="mt-5 p-4 bg-blue-600 text-white font-bold text-xl rounded-lg mb-5">
                    {teamStats["teamA"].totalRuns > teamStats["teamB"].totalRuns ? (
                        <p>🏆{updatedMatch.TeamNames.teamA} Wins!</p>
                    ) : teamStats["teamA"].totalRuns < teamStats["teamB"].totalRuns ? (
                        <p>🏆{updatedMatch.TeamNames.teamA} Wins!</p>
                    ) : (
                        <p>🤝 Match Draw!</p>
                    )}
                </div>
            )}

        </div>
        
    )
}