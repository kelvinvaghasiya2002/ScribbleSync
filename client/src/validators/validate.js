

export const emailValidation = (email) => {
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        return true
    }
    return false;
}

