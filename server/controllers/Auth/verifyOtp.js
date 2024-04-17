import { response } from "express";
import { Otp } from "../../models/otp.js";



export const verifyOtp = (req,res)=>{
    const {otp , email} = req.headers;
    
    Otp.findOne({email : email}).then((response)=>{
        console.log(response);
        if(!response){
            res.status(400).json({
                error : "otp is expired!"
            })
        }else{
            if(response.otp === otp){
                res.status(200).json({
                    success : "otp has been verified successfully!"
                })
            }else{
                res.status(400).json({
                    error : "otp didn't match"
                })
            }
        }
    }).catch((err)=>{
        res.status(400).json({
            error : "error occured in verification! Try again later."
        })
    })
}