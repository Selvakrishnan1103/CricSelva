"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlayerDetailsCom() {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const res = await fetch("/api/player");
                if (!res.ok) {
                    throw new Error("Failed to fetch players");
                }
                const data = await res.json();
                setPlayers(data.players);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchPlayers();
    }, []);

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function handleProfile(id) {
        router.push(`/player/${id}`);
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-green-600">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
                Players List
            </h2>

            
            <input
                type="text"
                placeholder="Search players..."
                className="w-full p-3 border-2 border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            
            <ul className="mt-4 space-y-3">
                {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                        <li 
                            key={player._id} 
                            className="p-4 bg-green-600 text-white rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:bg-green-700 active:scale-95"
                            onClick={() => handleProfile(player._id)}
                        >
                            <span className="font-semibold">{player.name}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No players found</p>
                )}
            </ul>
        </div>
    );
}
