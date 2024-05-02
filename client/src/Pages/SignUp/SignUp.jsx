import { useState } from "react";
import "./signup.css"
import {
    handleChange,
    handleGetOtp,
    handleSubmitOtp,
} from "./handlers.js";
import axios from "axios";
const server = import.meta.env.VITE_SERVER;
import google from "../../assets/googleSI.png"
import { useUserInfo } from "../../contexts/user.jsx";
import { Navigate, Link } from "react-router-dom";
import GoogleSI from "./GoogleSI.jsx";




export default function SignUp() {
    const { setContextUser, setloggedIn, ContextUser, loggedIn } = useUserInfo();
    console.log(ContextUser);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [getOTP, setgetOTP] = useState(false);
    const [verifyOTP, setverifyOTP] = useState(false);
    const [OTP, setOTP] = useState("");
    const [isLoading, setLoading] = useState(false);


    const handleSignUpData = async (event) => {
        event.preventDefault();
        setLoading(true);
        const button = document.getElementById("submitSignupData");
        button.setAttribute("disabled", "");


        setUser({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        console.log(user);
        try {
            const response = await axios.post(`${server}/register`, {}, {
                headers: {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                }
            })
            alert(response.data.success);
            console.log(response.data);
            localStorage.setItem("_session", response.data.token)
            setContextUser(response.data.user);
            setloggedIn(true)
            setLoading(false)
            button.removeAttribute("disabled");
        } catch (error) {
            alert(error.response.data.error);
            setgetOTP(false);
            setOTP("")
            setverifyOTP(false);
            setLoading(false)
            button.removeAttribute("disabled");
        }
    }


    return (
        <>
            <div className='signUp-container'>
                <section id='signUp-form'>
                    <form>
                        <div className='signup-heading'>
                            <h1>Sign Up</h1>
                        </div>

                        <GoogleSI />


                        <div className='continue-with'>
                            <div className="separator">
                                <p> OR  </p>
                            </div>
                        </div>



                        <div className='parent-username-field form-signup-inputs'>
                            <div>
                                <label htmlFor='username'>Username</label>
                            </div>
                            <div>
                                <input
                                    name="username"
                                    value={user.username}
                                    placeholder="Enter username"
                                    onChange={(event) => {
                                        handleChange(event, setUser)
                                    }}
                                />
                            </div>
                        </div>

                        <div className='parent-username-field form-signup-inputs'>
                            <div>
                                <label htmlFor='username'>Email</label>
                            </div>
                            <div>
                                <input
                                    name="email"
                                    value={user.email}
                                    placeholder="Enter your email"
                                    onChange={(event) => {
                                        handleChange(event, setUser)
                                    }}
                                />
                            </div>
                        </div>

                        {!getOTP &&
                            <div className='signup-button'>
                                <button id="GetOtpButton" onClick={(event) => {
                                    handleGetOtp(event, user, setgetOTP, setLoading)
                                }}>
                                    {
                                        isLoading ? <div className="parent-loading"><div className="loader"></div></div>
                                            : <>Get OTP</>
                                    }
                                </button>
                            </div>
                        }

                        {
                            getOTP && !verifyOTP &&
                            <>
                                <div className='parent-username-field form-signup-inputs'>
                                    <div>
                                        <label htmlFor='OTP'>OTP</label>
                                    </div>
                                    <div>
                                        <input
                                            name="OTP"
                                            value={OTP}
                                            onChange={(event) => {
                                                setOTP((prev) => {
                                                    return event.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='signup-button'>
                                    <button id="submitOtpButton" onClick={(event) => {
                                        handleSubmitOtp(event, user, OTP, setgetOTP, setverifyOTP, setLoading)
                                    }}>
                                        {
                                            isLoading ? <div className="parent-loading"><div className="loader"></div></div>
                                                : <>submit Otp</>
                                        }
                                    </button>
                                </div>
                            </>
                        }

                        {
                            verifyOTP && getOTP &&
                            <>
                                <div className='parent-password-field form-signup-inputs'>
                                    <div>
                                        <label htmlFor='username'>Password</label>
                                    </div>
                                    <div>
                                        <input
                                            name="password"
                                            value={user.password}
                                            onChange={(event) => {
                                                handleChange(event, setUser)
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='parent-password-field form-signup-inputs'>
                                    <div>
                                        <label htmlFor='username'>Confirm Password</label>
                                    </div>
                                    <div>
                                        <input
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                            onChange={(event) => {
                                                handleChange(event, setUser)
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className='signup-button'>
                                    <button id="submitSignupData" onClick={handleSignUpData}>

                                        {
                                            isLoading ? <div className="parent-loading"><div className="loader"></div></div>
                                                : <>SUBMIT</>
                                        }
                                    </button>
                                </div>
                            </>
                        }

                        <div className='dont-have-an-accnt'>
                            <p>Already have an account ? <Link to="/sign-in">Sign in</Link></p>
                        </div>


                    </form>
                </section>
            </div>

            {
                loggedIn && <Navigate to="/" replace={true} />
            }
        </>
    )
}