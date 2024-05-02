import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import axios from "axios";
import { useUserInfo } from "./contexts/user.jsx";
// import Calendar from "react-calendar";
import Calendar from "./Pages/Calendar/Calendar.jsx";
const server = import.meta.env.VITE_SERVER;

export default function App() {
    const { setContextUser, ContextUser, setloggedIn, loggedIn } = useUserInfo();
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${server}/getuser`, {
                    headers: {
                        token: localStorage.getItem("_session")
                    }
                })
                console.log(response.data.user);
                setContextUser(response.data.user);
                setloggedIn(true);
            } catch (error) {
                console.log(error);
                try {
                    const response = await axios.get(`${server}/login/success`,
                        { withCredentials: true }
                    );
                    console.log(response.data);
                    setContextUser(response.data.user);
                    setloggedIn(true)
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getUser();
    }, [loggedIn])


    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element = {<Calendar />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </>
    )
}