import mongoose from "mongoose";

export const PlayerSchema =new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , ref : "User", required : true},
    matchId : { type : mongoose.Schema.Types.ObjectId ,  ref : "Match", required : true},
    team : { type : String , enum : [ "teamA", "teamB"], required : true},
    runs : {type : Number , default : 0},
    wickets : { type : Number , default : 0 }

},{ timestamps : true})

const Player =  mongoose.models.Player || mongoose.model("Player", PlayerSchema)
export default Player