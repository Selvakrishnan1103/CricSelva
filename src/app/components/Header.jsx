"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
        { name: "Home", path: "/test" },
        { name: "Matches", path: "/matches" },
        { name: "Creation", path: "/create-match" },
        { name: "Leaderboard", path : "/leaderboard"},
        { name: "Players" , path : '/players'}
    ];

    return (
        <div>
            <div className="flex justify-between items-center border-b-2 border-green-600 bg-green-600 text-white p-4">
                <div className="flex justify-between items-center m-5 pointer-events-none">
                    <h1 className={`text-white font-bold text-2xl ${isOpen ? "hidden" : "block"}`}>CricSelva</h1>
                </div>
                <div>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white lg:hidden focus:outline-none">
                        {isOpen ? <X size={40} /> : <Menu size={40} />}
                    </button>
                </div>
                
                {isOpen && (
                    <div className="absolute top-16 left-0 w-full bg-green-600 p-2 transition-all duration-300 lg:hidden">
                        <div>
                            <ul className="flex flex-col gap-1 text-white font-semibold text-lg list-none">
                                {menuItems.map((item) => (
                                    <li key={item.path}>
                                        <a href={item.path} className="block hover:bg-white hover:text-green-600 p-2">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="hidden lg:flex lg:items-center lg:p-2">
                    <ul className="flex flex-row gap-10 font-semibold text-lg list-none">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <a href={item.path} className="block hover:bg-white hover:text-green-600 p-2">
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
