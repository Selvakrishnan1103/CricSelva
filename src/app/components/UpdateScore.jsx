"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateScore() {
    const [players, setPlayers] = useState([]);
    const [playerStats, setPlayerStats] = useState({});
    const matchId = useSelector((state) => state.match.matchId);

    useEffect(() => {
        if (matchId) fetchMatchPlayers();
    }, [matchId]);

    async function fetchMatchPlayers() {
        try {
            const res = await fetch(`/api/players?matchId=${matchId}`);
            if (!res.ok) throw new Error("Failed to fetch players");
            const data = await res.json();
            setPlayers(data.players);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function updatePlayer(playerId) {
        try {
            const res = await fetch(`/api/players/${playerId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    playerId : playerId ,
                    runs: playerStats[playerId]?.runs || 0,
                    wickets: playerStats[playerId]?.wickets || 0,
                }),
            });

            if (!res.ok) throw new Error("Failed to update player stats");

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function updatePlayerStats(userId, runs, wickets) {
        try {
            const res = await fetch(`/api/player/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId , runs, wickets }),
            });

            if (!res.ok) throw new Error("Failed to update player stats");

            const data = await res.json();
            console.log("Updated total stats:", data);
        } catch (error) {
            console.error(error.message);
        }
    }

    function Matchdetails(){
        
        router.push(`/match/${matchId}`)
    }

    return (
        <div className="grid grid-rows-2 gap-4 mt-5">
            
            {["teamA", "teamB"].map((team) => (
                <div key={team} className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-green-600">{team === "teamA" ? "Team A" : "Team B"}</h1>
                    <ul>
                        {players.filter(player => player.team === team).map((player) => (
                            <li key={player._id} className="flex gap-5 border border-white p-3 bg-green-600 text-white font-semibold text-lg">
                                <p className="w-35">{player.userId.name}</p>
                                <input
                                    type="number"
                                    value={playerStats[player._id]?.runs || 0}
                                    onChange={(e) =>
                                        setPlayerStats(prev => ({
                                            ...prev,
                                            [player._id]: { ...prev[player._id], runs: Number(e.target.value) }
                                        }))
                                    }
                                    className="w-10 h-10 bg-white text-green-600"
                                />
                                <input
                                    type="number"
                                    value={playerStats[player._id]?.wickets || 0}
                                    onChange={(e) =>
                                        setPlayerStats(prev => ({
                                            ...prev,
                                            [player._id]: { ...prev[player._id], wickets: Number(e.target.value) }
                                        }))
                                    }
                                    className="w-10 h-10 bg-white text-green-600"
                                />
                                <button
                                    onClick={() => {
                                        updatePlayer(player._id);
                                        updatePlayerStats(player.userId._id, playerStats[player._id]?.runs || 0, playerStats[player._id]?.wickets || 0);
                                    }}
                                    className="w-10 h-10 bg-white text-green-600"
                                >
                                    Ok
                                </button>
                                
                            </li>
                        ))}
                    </ul>
                    
                </div>
            ))}
        </div>
    );
}
