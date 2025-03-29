"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    matchId : typeof window !== "undefined" ? localStorage.getItem("matchId") : null
}
export const MatchSlice = createSlice({
    name : "match" , 
    initialState : initialState,
    reducers: {
        setMatchId : ( state , action ) => {
            state.matchId = action.payload
            localStorage.setItem("matchId",action.payload)
        },

    }
})

export const { setMatchId } = MatchSlice.actions
export default MatchSlice.reducer