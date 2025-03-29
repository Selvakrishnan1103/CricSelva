import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name : { type : String , required : true},
    email : {type : String , unique : true , required : true},
    score : { runs : {type : Number , default : 0}, wickets : { type : Number , default : 0}}
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User