import { useContext, useState } from "react";
import { createContext } from "react";


export const userContext = createContext(null);


export function useUserInfo() {
    const userInfo = useContext(userContext);
    return userInfo;
}




export default function UserProvider(props) {
    const [loggedIn , setloggedIn] = useState(false);
    const [user , setUser] = useState({});

    return (
        <userContext.Provider value={{setUser , user , setloggedIn , loggedIn}}>
            {props.children}
        </userContext.Provider>
    )
}