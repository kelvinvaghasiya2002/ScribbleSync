import axios from "axios"
const server = import.meta.env.VITE_SERVER;





export const handleSubmit = async (date, setListItems, ContextUser, todoItem , setTodoItem) => {
    try {
        const response = await axios.post(`${server}/additems`, {}, {
            headers: {
                email: ContextUser.email,
                data: date.toDateString(),
                item: todoItem
            }
        });
        console.log(response.data.result);
        setListItems(response.data.result)
        setTodoItem("")
    } catch (error) {
        console.log(error);
    }
}



export const handleCheckBoxClick = async (id, setListItems, ContextUser, date) => {
    try {
        const response = await axios.post(`${server}/checkitems`, {}, {
            headers: {
                id: id,
                email: ContextUser.email,
                data: date.toDateString()
            }
        })
        console.log(response.data.result);
        setListItems(response.data.result)
    } catch (error) {
        console.log(error);
    }
}


export const handleDeletion = async (id, setListItems, ContextUser, date) => {
    try {
        const response = await axios.delete(`${server}/deleteitem`, {
            headers: {
                id: id,
                email: ContextUser.email,
                todo_date : date.toDateString()
            }
        })
        console.log(response.data.result);
        setListItems(response.data.result)
    } catch (error) {
        console.log(error);
    }
}