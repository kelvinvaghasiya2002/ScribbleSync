import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../../models/user.js"
import { response } from "express";



export const getUser = (req,res)=>{
    const {token} = req.headers;
    try {
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        // console.log(decode);
        res.status(200).json({
            user : {
                email : decode.email,
                username : decode.username
            }
        })
    } catch (error) {
        res.status(400).json({
            error : "You are not authorized"
        })
    }
    // console.log(decode);
}







export const loginUser = (req, res) => {
    const { email, password } = req.headers
    console.log(email + password);
    User.findOne({ email: email }).then((response) => {
        if (!response) {
            res.status(400).json({
                error: "This user doesn't exist!"
            })
        } else {
            bcrypt.compare(password, response.password, (err, result) => {
                if (err) {
                    res.status(400).json({
                        error: "Error occured in sign in!"
                    })
                }

                console.log(result);
                if (result) {
                    const token = jwt.sign({
                        username: response.username,
                        email: response.email
                    }, process.env.JWT_SECRET, { expiresIn: "5m" })

                    res.status(200).json({
                        success: "successfully logged in!",
                        token: token,
                        user: {
                            username: response.username,
                            email: response.email
                        }
                    })
                } else {
                    res.status(400).json({
                        error: "password is wrong!!"
                    })
                }
            })
        }


    })

}