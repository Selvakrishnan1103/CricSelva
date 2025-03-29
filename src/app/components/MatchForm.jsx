"use client"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setMatchId } from "../store/MatchSlice"
import { useRouter } from "next/navigation"

export default function MatchForm(){
    const [ matchName , setMatchName] = useState("")
    const [ teamA , setTeamA] = useState("")
    const [ teamB , setTeamB] = useState("")
    const [ message , setMessage] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()
    
    async function createMatch(e){
        e.preventDefault()
        const newMatch = { matchName , teamA , teamB}
        
        try{
            const res = await fetch('/api/match',{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(newMatch)
            })
            if(!res.ok){
                throw new Error("Failed to fetch")
            }

            const data = await res.json()
            
            dispatch(setMatchId(data.match._id))
            setMessage(data.message)
            setMatchName("");
            setTeamA("");
            setTeamB("");
            router.push(`create-match/match/${data.match._id}/add-players`)
        }catch(error){
            setMessage(error.message)
        }
    }

    return(
        
        <div className="h-100 mt-5">
            <form onSubmit={createMatch} className="p-2 flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl font-bold text-green-600">Creation-Form</h1><br></br>
                <input 
                    type="text"
                    value={matchName}
                    onChange={(e) => setMatchName(e.target.value)}
                    placeholder="Match Name"
                    className="border-1 border-green-600 p-2 w-70 focus:outline-2 focus:outline-green-600 rounded-lg text-green-600 font-semibold"

                />
                <input 
                    type="text"
                    value={teamA}
                    onChange={(e) => setTeamA(e.target.value)}
                    placeholder="Enter Team One Name"
                    className="border-1 border-green-600 p-2 w-70 focus:outline-2 focus:outline-green-600 rounded-lg text-green-600 font-semibold"
                />
                <input 
                    type="text"
                    value={teamB}
                    onChange={(e) => setTeamB(e.target.value)}
                    placeholder="Enter Team two Name"
                    className="border-1 border-green-600 p-2 w-70 focus:outline-2 focus:outline-green-600 rounded-lg text-green-600 font-semibold"
                /><br></br>
                <button type="submit" className="p-2 border-2 border-green-200 text-green-600 w-30 h-15 font-semibold hover:bg-green-600 hover:text-white focus:outline-2 focus:outline-green-600">
                    Create Match
                </button>
            </form>
            <div>
                { message && <p className="text-lg font-bold text-red-600">{message}</p>}
            </div>
            
        </div>
    )
}