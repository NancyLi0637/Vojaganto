export const verifyLogin = (userName, userPassword) => {
    if(userName==="user" && userPassword==="user"){
        return true;
    }else{
        return false;
    }
};

export const verifyRegister = (userName) => {
    if(userName==='user' || userName==='admin'){
        return false;
    }else{
        return true;
    }
}