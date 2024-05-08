import express from "express"
const router = express.Router();
import passport from "passport";


router.get("/google",passport.authenticate("google" , ["profile","email"]));

router.get("/login/failure",(req,res)=>{
    res.status(401).json({
        error : "Login failed!"
    })
})


router.get("/login/success",(req,res)=>{
    console.log(req.user);
    if(req.user){
        res.status(200).json({
            success : "you are authorized!",
            user : req.user
        })
    }else{
        res.status(401).json({
            error : "you are not authorized!"
        })
    }
})



router.get('/auth/google/callback',
    passport.authenticate('google',
        {
            successRedirect: process.env.CLIENT_URL,
            failureRedirect: '/login/failure'
        }
    ),
);






export default router;