export const verifyUser = (userName, userPassword) => {
   

    if(userName==="user" && userPassword==="user"){
        return true;
    }else{
        return false;
    }
};