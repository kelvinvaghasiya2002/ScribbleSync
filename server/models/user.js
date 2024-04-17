import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})

export const User = new mongoose.model("User",userSchema);
