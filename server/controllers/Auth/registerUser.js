import { User } from "../../models/user.js"
import express from "express"
const app = express();
import bcrypt from "bcrypt"
const saltRounds = 10;
import jwt from "jsonwebtoken"
import 'dotenv/config'
import cookieParser from "cookie-parser";
app.use(cookieParser());

export const registerUser = (req, res) => {
    const { username, email, password } = req.headers;

    User.findOne({ email: email }).then((response) => {
        if (response) {
            res.status(400).json({
                error: "This user already exist"
            })
        } else {

            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    res.status(400).json({
                        error: "error occured in hashing"
                    })
                }
                const newUser = new User({
                    username, email, password:hash
                })

                const token = jwt.sign({
                    username: username,
                    email: email
                }, process.env.JWT_SECRET, { expiresIn: '5m' });

                newUser.save().then(() => {
                    res.status(200).json({
                        success: "Successfully registered!",
                        token: token,
                        user: {
                            username , email
                        }
                    })
                }).catch((err) => {
                    res.status(400).json({
                        error: "error occured in sign up."
                    })
                })
            });
        }
    }).catch(() => {
        res.status(500).json({
            error: "internel server error"
        })
    })
}