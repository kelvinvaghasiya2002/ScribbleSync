import "./ComposeNote.css"
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import useComposeNote from "../../hooks/useComposeNote";

function ComposeNote({composeNote , noteRef}) {
    const { Note , setNote ,handleNoteChange} = useComposeNote();

    console.log(Note);

    return (
        <div ref={noteRef} style={{display : composeNote ? "block" : "none"}} className="scale-in-br" id="Note-Pop-up">
            <div className="note-title">
                <input
                    placeholder="Title"
                    name="title"
                    value={Note.title}
                    onChange={handleNoteChange}
                />
            </div>
            <div className="note-text-area">
                <textarea
                    placeholder="Take a note . . ."
                    name="content"
                    value={Note.content}
                    onChange={handleNoteChange}
                />
            </div>
            <div className="flex-buttons">
                <div>
                    <AddIcon className="plus-icon" />
                </div>
            </div>
        </div>
    )
}

export default ComposeNote