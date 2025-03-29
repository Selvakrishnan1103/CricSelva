import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI){
    throw new Error("Please check the MONGO_URI")
}

let cached = global.mongoose || { conn : null , Promise : null}

export async function connectToMongoDb(){

    if( cached.conn ) return cached.conn

    if(!cached.Promise){
        cached.Promise = mongoose.connect(MONGO_URI,{
            serverSelectionTimeoutMS: 30000,
        })
    }

    cached.conn = await cached.Promise

    return cached.conn
}