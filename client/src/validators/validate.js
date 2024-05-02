

export const emailValidation = (email) => {
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        return true
    }
    return false;
}


export const usernameValidation = (username)=>{
    if(username.length<6){
        // alert("Username should contain atleast 6 characters")
        return false
    }else if(username.match(/^[a-zA-Z0-9]/)){
        return true;
    }
    return false
}

