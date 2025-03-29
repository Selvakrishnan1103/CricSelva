"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function Footer(){
    return(
        <div className="flex border-2 border-green-600 bg-green-600">
            <div className="flex flex-col grow-5 p-15 gap-2">
                <Link href="/test" className="text-white">➢Home</Link>
                <Link href="/matches" className="text-white" >➢Match</Link>
                <Link href="/create-match" className="text-white">➢Creation</Link>
                <Link href="/leaderboard" className="text-white">➢Leaderboard</Link>
                <Link href="#" onClick={(e) => { e.preventDefault(); signOut({ callbackUrl: "/" }); }} className="text-white">
                    ➢ Log Out
                </Link>
            </div>
            <div className="grow-5"></div>
        </div>
    )
}