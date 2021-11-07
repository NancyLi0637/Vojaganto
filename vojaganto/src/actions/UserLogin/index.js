export const verifyUser = props => {
    const userName = props.userName;
    const userPassword = props.userPassword;
    
    console.log(userName==='user');

    if(userName==="user" && userPassword==="user"){
        return true;
    }else{
        return false;
    }
};