import { useState } from "react";
import axios from "axios";
import { useUserInfo } from "../contexts/user";

export default function useDateChange(setListItems) {
    const [date, changeDate] = useState(new Date());
    const { ContextUser } = useUserInfo();
    const server = import.meta.env.VITE_SERVER;

    const handleDateChange = async (val) => {
        try {
            const response = await axios.get(`${server}/getitems`, {
                headers: {
                    email: ContextUser.email,
                    data: val.toDateString()
                }
            })
            console.log(response.data.result);
            setListItems(response.data.result)
        } catch (error) {
            console.log(error);
        }
        changeDate(val);
    }

    return { date, handleDateChange }
}