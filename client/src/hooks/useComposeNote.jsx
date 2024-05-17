import { useState } from "react";

export default function useComposeNote() {
    const [Note, setNote] = useState({
        title: "",
        content: ""
    });

    const handleNoteChange = (event) => {
        setNote((prevValue) => {
            return (
                {
                    ...prevValue,
                    [event.target.name]: event.target.value
                }
            )
        })
    }
    
    return {
        Note ,
        setNote ,
        handleNoteChange
    }
}