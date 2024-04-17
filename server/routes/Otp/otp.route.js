import express, { response } from "express";
const router = express.Router();
import { getOtp } from "../../controllers/Auth/getOtp.js";
import { verifyOtp } from "../../controllers/Auth/verifyOtp.js";




router.post("/getotp", getOtp);


router.get("/verifyotp", verifyOtp);




export default router;