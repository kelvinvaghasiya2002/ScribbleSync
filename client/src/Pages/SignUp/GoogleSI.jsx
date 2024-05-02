import React from 'react'
const server = import.meta.env.VITE_SERVER;
import google from "../../assets/googleSI.png"

export default function GoogleSI() {
    const handleSignUpWithGoogle = (e) => {
        e.preventDefault();
        window.open(`${server}/auth/google/callback`, "_self");
    }
    return (
        <>
            <div onClick={handleSignUpWithGoogle} className='signup-with-google'>
                <button >
                    <img src={google} />
                    <p>continue with google</p>
                </button>
            </div>
        </>
    )
}