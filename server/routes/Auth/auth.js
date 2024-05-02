import express from "express";
import { registerUser } from "../../controllers/Auth/registerUser.js";
import { loginUser , getUser } from "../../controllers/Auth/loginUser.js";
const router = express.Router();


router.post("/register",registerUser)

router.get("/login",loginUser)

router.get("/getuser", getUser)



export default router;