import { emailValidation, usernameValidation } from "../../validators/validate.js";
import axios from "axios"
const server = import.meta.env.VITE_SERVER;


// WHEN USER TYPES EITHER OF EMAIL , PASSWORD OR CONFIRM PASSWORD , 
// BELOW handleChange FUNCTION GETS TRIGGERED 


export const handleChange = (event, setUser) => {
    const { name, value } = event.target;
    setUser((prevValue) => {
        return {
            ...prevValue,
            [name]: value
        }
    })
}


// WHEN USER PRESSES GET OTP BUTTON , BELOW handleGetOtp FUNCTION GETS 
// TRIGGERED


export const handleGetOtp = async (e, user, setgetOTP, setLoading) => {
    e.preventDefault();

    const button = document.getElementById("GetOtpButton");
    button.setAttribute("disabled", "");

    setLoading(true);
    if (emailValidation(user.email) && usernameValidation(user.username)) {
        try {
            console.log("Hello World");
            const { data } = await axios.post(`${server}/getotp`, {}, {
                headers: {
                    email: user.email
                }
            })

            alert(data.success);
            setgetOTP(true)
            button.removeAttribute("disabled");
            setLoading(false)
        } catch (error) {
            alert(error.response.data.error);
            button.removeAttribute("disabled");
            setLoading(false)
        }
    } else if (!emailValidation(user.email)) {
        alert("Invalid Email!")
        button.removeAttribute("disabled");
        setLoading(false)
    } else if(!usernameValidation(user.username)){
        alert("Invalid Username!")
        button.removeAttribute("disabled");
        setLoading(false)
    }
}



// WHEN USER PRESSES SUBMIT OTP BUTTON , BELOW handleSubmitOtp Function
// GETS TRIGGERED



export const handleSubmitOtp = async (event, user, OTP, setgetOTP, setverifyOTP , setLoading) => {
    event.preventDefault();
    console.log(user);

    const button = document.getElementById("submitOtpButton");
    button.setAttribute("disabled","")

    setLoading(true);
    try {
        const { data } = await axios.get(`${server}/verifyotp`, {
            headers: {
                email: user.email,
                otp: OTP
            }
        })
        alert(data.success);
        setverifyOTP(true);
        setLoading(false)
        button.removeAttribute("disabled");
    } catch (error) {
        setgetOTP(false)
        alert(error.response.data.error);
        setLoading(false)
        button.removeAttribute("disabled");
    }
}