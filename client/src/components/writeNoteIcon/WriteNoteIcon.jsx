import React from 'react'
import "./NoteIcon.css"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function WriteNoteIcon() {
    return (
        <div className='parent-note-icon'>
            <EditOutlinedIcon style={{color : "#d8d4c8"}} />
        </div>
    )
}

export default WriteNoteIcon