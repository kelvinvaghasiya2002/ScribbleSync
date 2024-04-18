import { emailValidation } from "../../validators/validate.js";
import axios from "axios"


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


export const handleGetOtp = async (e, user, setgetOTP) => {
    e.preventDefault();
    const server = import.meta.env.VITE_SERVER;
    if (emailValidation(user.email)) {
        try {
            const { data } = await axios.post(`${server}/getotp`, {}, {
                headers: {
                    email: user.email
                }
            })
            
            alert(data.success);
            setgetOTP(true)
        } catch (error) {
            alert(error.response.data.error);
        }
    } else {
        alert("Invalid Email!")
    }
}



// WHEN USER TYPES INTO OTP FIELD , BELOW handleOTPChange Function
// GETS TRIGGERED


export const handleOTPChange = (event, setOTP) => {
    setOTP(event.target.value);
}



// WHEN USER PRESSES SUBMIT OTP BUTTON , BELOW handleSubmitOtp Function
// GETS TRIGGERED



export const handleSubmitOtp = async (event, user, OTP, setgetOTP , setverifyOTP) => {
    event.preventDefault();
    console.log(user);
    const server = import.meta.env.VITE_SERVER;
    try {
        const { data } = await axios.get(`${server}/verifyotp`, {
            headers: {
                email: user.email,
                otp: OTP
            }
        })
        alert(data.success);
        setverifyOTP(true);
    } catch (error) {
        setgetOTP(false)
        alert(error.response.data.error);

    }
}