import Navbar from "../../components/Navbar/Navbar"
import "./Home.css"
import "./NoteIcon.css"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ComposeNote from "../../components/ComposeNote/ComposeNote.jsx";
import { useRef, useState } from "react";
import useDetectOuterClick from "../../hooks/useDetectOuterClick.js";

export default function Home() {
    const [composeNote, setComposeNote] = useState(false);
    const noteRef = useRef();

    function handleNoteIconClick() {
        setComposeNote(true);
        document.getElementById("blurer").style.display = "block"
    }



    useDetectOuterClick(noteRef, "ComposeNote" , setComposeNote);

    return (
        <>
            <Navbar />
            <div id="blurer"></div>
            <ComposeNote composeNote={composeNote} noteRef={noteRef} />
            <div className='parent-note-icon' onClick={handleNoteIconClick} >
                <EditOutlinedIcon className="note-icon" />
            </div>
        </>
    )
}