import otpGen from "otp-generator";
import { Otp } from "../../models/otp.js";
import nodemailer from "nodemailer"
import 'dotenv/config'


export const getOtp = (req, res) => {
    const {email} = req.headers;
    const otp = otpGen.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const newOtp = new Otp({
        otp, email
    })

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    async function main() {
        const info = await transporter.sendMail({
            from: "support@scribblesync.com",
            to: email, // this email has come through header of the request
            subject: "Here's the 6-digit verification code you requested",
            html: `<h1>${otp}</h1><br><br><p>If you didn't request a code, kindly ignore!</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
    }

    main().then(() => {
        Otp.findOneAndDelete({ email: email }).then((response) => {
            //response = object if data has been deleted or null if data has not been deleted
            newOtp.save().then((response) => {
                res.status(200).json(
                    {
                        response: response.createdAt,
                        success: "Otp generated successfully"
                    }
                )
            }).catch((error) => {
                res.status(500).json({
                    error: "Internel server error"
                })
            })

        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        res.status(500).json({
            error: "Internel server error"
        })
    });

}





