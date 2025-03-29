"use client";

import Link from "next/link";

export default function MatchesButton(){
    return(
        <Link href="/matches"><button className="p-4 border-2 border-blue-600">Matches</button></Link>
    )
}