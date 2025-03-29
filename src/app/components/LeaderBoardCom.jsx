"use client";
import { useEffect, useState } from "react";

export default function Leaderboard() {
    const [topBatsmen, setTopBatsmen] = useState([]);
    const [topBowlers, setTopBowlers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch("/api/leaderboard");
                const data = await response.json();
                setTopBatsmen(data.topBatsmen);
                setTopBowlers(data.topBowlers);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-3">🏏 Top Batsmen</h2>
                    <table className="w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Rank</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Runs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topBatsmen.map((player, index) => (
                                <tr key={player._id} className="text-center">
                                    <td className="border border-gray-300 p-2">#{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{player.name}</td>
                                    <td className="border border-gray-300 p-2">{player.score.runs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className="text-2xl font-semibold mb-3">🎯 Top Bowlers</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Rank</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Wickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topBowlers.map((player, index) => (
                                <tr key={player._id} className="text-center">
                                    <td className="border border-gray-300 p-2">#{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{player.name}</td>
                                    <td className="border border-gray-300 p-2">{player.score.wickets}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
