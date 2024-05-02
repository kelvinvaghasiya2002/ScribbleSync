import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useEffect, useRef, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useUserInfo } from '../../contexts/user';
import { Link } from 'react-router-dom';


export default function Hamburger({ hamburgerClick, sethamburgerClick }) {
    let { loggedIn } = useUserInfo();
    const menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                sethamburgerClick(false)
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return <>
        <div ref={menuRef} className={!hamburgerClick ? 'close-hamburger-menu slide-out-blurred-left' : 'hamburger-menu scale-in-hor-left'}>
            <div>
                {
                    loggedIn ?
                        <>
                            <div style={{ width: "20vw" }}><EventNoteIcon /></div>
                            <div><Link><p>Calendar</p></Link></div>
                        </> :
                        <>

                            <div style={{ width: "20vw" }}><LoginIcon /></div>
                            <div><Link to="sign-in"><p>Log In</p></Link></div>

                        </>
                }
            </div>
            <div>

                {
                    loggedIn ?
                        <>
                            <div style={{ width: "20vw" }}><GroupAddIcon /></div>
                            <div><Link><p>Collobrations</p></Link></div>
                        </> :
                        <>
                            <div style={{ width: "20vw" }}><PersonAddIcon /></div>
                            <div><Link to="sign-up"><p>Sign up</p></Link></div>
                        </>
                }
            </div>
            <div>
                {
                    loggedIn &&
                    <>
                        <div><p>Sign Out</p></div>
                    </>
                }
            </div>
        </div>
    </>
}