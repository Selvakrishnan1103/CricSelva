"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PlayerProfileCom() {
    const { userId } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (!userId) return;

        async function fetchPlayerData() {
            try {
                const res = await fetch(`/api/player/${userId}`);
                if (!res.ok) throw new Error("Failed to fetch player data");
                const data = await res.json();
                setPlayer(data.player);
                
                console.log(data.player);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchPlayerData();
    }, [userId]);

    if (!player || player.length === 0) {
        return <p className="text-center mt-10 text-lg">Loading player data...</p>;
    }

    const totalMatches = player.length;
    const totalRuns = player[0]?.userId?.score?.runs || 0;
    const totalWickets = player[0]?.userId?.score?.wickets || 0;
    const battingAverage = totalMatches > 0 ? (totalRuns / totalMatches).toFixed(2) : "0";

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md border border-green-600">
            <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
                {player[0]?.userId?.name}'s Profile
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-green-600 text-left">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="p-3 border border-green-600">Statistic</th>
                            <th className="p-3 border border-green-600">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-green-100">
                            <td className="p-3 border border-green-600 font-medium">Matches Played</td>
                            <td className="p-3 border border-green-600">{totalMatches}</td>
                        </tr>
                        <tr className="hover:bg-green-100">
                            <td className="p-3 border border-green-600 font-medium">Total Runs</td>
                            <td className="p-3 border border-green-600">{totalRuns}</td>
                        </tr>
                        <tr className="hover:bg-green-100">
                            <td className="p-3 border border-green-600 font-medium">Total Wickets</td>
                            <td className="p-3 border border-green-600">{totalWickets}</td>
                        </tr>
                        
                        <tr className="hover:bg-green-100">
                            <td className="p-3 border border-green-600 font-medium">Batting Average</td>
                            <td className="p-3 border border-green-600">{battingAverage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
