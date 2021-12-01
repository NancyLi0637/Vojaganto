import * as api from "api/auth"

function setCurrUser(app, newUser) {
    console.log("Set Curr User", newUser)
    app.setState({ currUser: newUser })
}

export async function loginUser(username, password) {
    try {
        if (username.length < 1 || password.length < 1){
            alert("Please enter username and password")
            return null
        }
        
        const user = await api.clientLogin(username, password)

        if (!user) {
            alert("Invalid Credentials")
            return null
        } else {
            return user
        }

    } catch (err) {
        console.error(err)
        alert(String(err))
    }
}

export async function loginAdmin(username, password) {
    try {
        if (username.length < 1 || password.length < 1){
            alert("Please enter username and password")
            return null
        }
        
        const user = await api.adminLogin(username, password)

        if (!user) {
            alert("Invalid Credentials")
            return null
        } else if (user.role !== "admin") {
            alert("Permission denied")
            return null
        } else if (user.role === "admin") {
            return user
        }

    } catch (err) {
        console.error(err)
        alert(String(err))
    }
}


export async function registerUser(username, password) {
    try {
        if (username.length < 1 || password.length < 1){
            alert("Please enter username and password")
            return null
        } else if(username === "admin" || username === "user") {
            return null
        }
        
        const user = await api.clientRegister(username, password)

        if (!user) {
            alert("Username already exists")
            return null
        } else {
            return user
        }

    } catch (err) {
        console.error(err)
        alert(String(err))
    }
}

export { setCurrUser }