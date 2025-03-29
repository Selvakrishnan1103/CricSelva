"use client";

import { signOut } from "next-auth/react";

export default function LogOutButton(){
    return(
        <div>
            <button onClick={()=>signOut({ callbackUrl : '/'})} className="p-4 border-2 border-blue-600">SignOut</button>
        </div>
    )
}