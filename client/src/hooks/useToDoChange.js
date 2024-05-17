import { useState } from "react";

export default function useToDoChange() {
    const [todoItem, setTodoItem] = useState("");
    function handleTodoChange(event) {
        setTodoItem(event.target.value)
    }

    return {
        todoItem,
        handleTodoChange,
        setTodoItem
    }
}