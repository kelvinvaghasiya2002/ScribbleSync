import { useState } from "react";
import {
    handleChange,
    handleGetOtp,
    handleSubmitOtp,
    handleOTPChange
} from "./handlers.js";




export default function SignUp() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    // console.log(user);
    const [getOTP, setgetOTP] = useState(false);
    const [verifyOTP, setverifyOTP] = useState(false);
    const [OTP, setOTP] = useState();


    return (
        <>
            <form>
                <input
                    name="email"
                    value={user.email}
                    onChange={(event) => {
                        handleChange(event, setUser)
                    }}
                />

                {!getOTP && <button onClick={(event) => {
                    handleGetOtp(event, user, setgetOTP)
                }}>get Otp</button>}

                {
                    getOTP && !verifyOTP &&
                    <>
                        <input
                            name="OTP"
                            value={OTP}
                            onChange={(event) => {
                                handleOTPChange(event, setOTP)
                            }}
                        />
                        <button onClick={(event) => {
                            handleSubmitOtp(event, user, OTP, setgetOTP, setverifyOTP)
                        }}>submit Otp</button>
                    </>
                }

                {
                    verifyOTP && getOTP &&
                    <>
                        <input
                            name="password"
                            value={user.password}
                            onChange={(event) => {
                                handleChange(event, setUser)
                            }}
                        />

                        <input
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={(event) => {
                                handleChange(event, setUser)
                            }}
                        />

                        <button onClick={handleSignUpData}>SUBMIT</button>
                    </>
                }


            </form>
        </>
    )
}