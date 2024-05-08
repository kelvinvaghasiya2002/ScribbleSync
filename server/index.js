import express from "express";
import mongoose from "mongoose";
const app = express();
import 'dotenv/config'
import authRouter from "./routes/Auth/auth.js";
import otpRouter from "./routes/Otp/otp.route.js"
import cors from "cors";
import "./controllers/passportAuth/passportStrategy.js"
import passport from "passport";
import session from "express-session";
import passportRouters from "./routes/Auth/passportRoutes.js"
import todorouter from "./routes/todos/todo.route.js";
const client = process.env.CLIENT_URL;



// app.use(cors(
//     {
//         origin : [`${client}`],
//         credentials : true
//     }
// ));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', [`${client}`]);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, email , token , otp, data , password , username , item , todo_date , id");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 
    }
}))




mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.log(error);
})

app.use(passport.initialize());
app.use(passport.session());


app.use(authRouter);
app.use(otpRouter);
app.use(passportRouters);
app.use(todorouter);

app.get("/", (req, res) => {
    res.json({
        success: "This site has been successfully deployed on vercel!"
    })
})





app.listen(3000, () => {
    console.log("server is on 3000");
})
