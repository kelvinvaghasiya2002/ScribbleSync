import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    email : {
        type : String
    },
    otp : {
        type : String
    },
    createdAt : {
        type : Date ,
        default : Date.now()
    }
})
otpSchema.index({createdAt : 1} , { expireAfterSeconds: 120})

export const Otp = new mongoose.model("Otp", otpSchema);