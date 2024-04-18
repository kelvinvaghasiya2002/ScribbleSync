import express from "express";
import mongoose from "mongoose";
const app = express();
import 'dotenv/config'
import  authRouter  from "./routes/Auth/auth.js";
import otpRouter from "./routes/Otp/otp.route.js"


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected");
}).catch((error)=>{
    console.log(error);
})


app.use(authRouter);
app.use(otpRouter);

app.get("/",(req,res)=>{
    res.json({
        success : "This site has been successfully deployed on render!"
    })
})





app.listen(3000 , ()=>{
    console.log("server is on 3000");
})
