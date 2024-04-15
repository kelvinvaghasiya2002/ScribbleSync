import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";







export default function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>
        </>
    )
}