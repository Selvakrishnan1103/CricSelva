"use client" ;
import {signIn} from "next-auth/react"
import {FcGoogle} from "react-icons/fc"
export default function LoginButton(){
    return(
        <div className="flex justify-center items-center h-100 ">
            <div className="flex gap-3 border-2 border-green-600 p-2">
                <FcGoogle size={40}/>
                <button onClick={()=>signIn("google",{ callbackUrl : '/test'})} className="text-lg font-semibold">
                    Sign in with Google
                </button>
            </div>
            
        </div>
    )
}