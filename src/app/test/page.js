"use client"

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { signOut } from "next-auth/react";

export default function test(){
    return(
        <div>
            <Header />
            <div className="flex flex-col gap-5 items-center justify-center w-full h-100">
                <h1 className="text-2xl font-bold text-green-600">CricSelva</h1><br></br><br></br>
                <div className="flex gap-4">
                    <Link href="/create-match"><button className="p-2 border-1 border-green-600 text-green-600 w-30 h-20 font-semibold hover:bg-green-600 hover:text-white">Match Creation</button></Link>
                    <Link href="/matches"><button className="p-2 border-1 border-green-600 text-green-600 w-30 h-20 font-semibold hover:bg-green-600 hover:text-white">Matches</button></Link>
                </div>
            </div>
            <Footer />
        </div>   
    )
}