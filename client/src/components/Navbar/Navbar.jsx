import "./Navbar.css"
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import { useRef, useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import { useUserInfo } from "../../contexts/user";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [hamburgerClick, sethamburgerClick] = useState(false);
    let { loggedIn } = useUserInfo();
    // loggedIn=true;
    console.log(loggedIn);

    let handleHamburgerClick = (e) => {
        sethamburgerClick(true)
    }
    return (
        <>
            <div className="navbar-container">
                <div onClick={handleHamburgerClick} className="navbar-menu-icon">
                    <MenuIcon className="menu-icon" />
                </div>
                <div className="H1"><h1>ScribbleSync</h1></div>
                <div className="nav-items">
                    <div>
                        {
                            loggedIn ? <p><Link>Calendar</Link></p>
                                : <p><Link to="sign-in">Sign In</Link></p>
                        }
                    </div>
                    <div>
                        {
                            loggedIn ? <p><Link>Collobrations</Link></p>
                                : <p><button className="sign-up-button"><Link to="sign-up">Get Started</Link></button></p>
                        }
                    </div>
                    <div>
                        {loggedIn && <Link><Person2Icon className="account-icon" /></Link>}
                    </div>
                </div>
                <Hamburger hamburgerClick={hamburgerClick} sethamburgerClick={sethamburgerClick} />
            </div>
        </>
    )
}