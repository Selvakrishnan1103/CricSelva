import { configureStore } from "@reduxjs/toolkit";
import MatchReducer from "./MatchSlice";

export const store = configureStore({
    reducer : {
        match : MatchReducer,
    }
})