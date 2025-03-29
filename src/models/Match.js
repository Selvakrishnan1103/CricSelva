import mongoose from "mongoose"

export const MatchSchema = new mongoose.Schema({
    MatchName : { type : String , required : true},
    createdBy : { type : String , required : true},
    TeamNames : { 
        teamA : {type : String , required : true} ,
        teamB : {type : String , required : true}
    },
    status : { type : String , default : "ongoing" , Enum : ["ongoing" , "Completed"]}
})
const Match = mongoose.models.Match || mongoose.model("Match", MatchSchema)
export default Match