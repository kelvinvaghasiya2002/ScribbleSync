import Navbar from "../../components/Navbar/Navbar"
import "./Home.css"
import "./NoteIcon.css"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ComposeNote from "../../components/ComposeNote/ComposeNote.jsx";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [composeNote, setComposeNote] = useState(false);
    const noteRef = useRef();

    function handleNoteIconClick() {
        setComposeNote(true);
        document.getElementById("blurer").style.display = "block"
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!noteRef.current.contains(event.target)) {
                setComposeNote(false);
                document.getElementById("blurer").style.display = "none"
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <Navbar />
            <div id="blurer"></div>
            {/* <div ref={noteRef} style={{display : composeNote ? "block" : "none"}}> */}
                <ComposeNote composeNote={composeNote} noteRef={noteRef} />
            {/* </div> */}

            <div className='parent-note-icon' onClick={handleNoteIconClick} >
                <EditOutlinedIcon style={{ color: "#d8d4c8" }} />
            </div>
        </>
    )
}