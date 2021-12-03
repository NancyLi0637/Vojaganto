import * as api from "api/auth"

export function setCurrUser(app, newUser) {
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
        return null
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
        return null
    }
}


export async function registerUser(username, password, name) {
    try {
        if (username.length < 1 || password.length < 1){
            alert("Please enter username and password")
            return null
        }
        
        const user = await api.clientRegister(username, password, name)

        if (!user) {
            alert("Username already exists")
            return null
        } else {
            return user
        }

    } catch (err) {
        console.error(err)
        alert(String(err))
        return null
    }
}


export async function resumeSession() {
    try {       
        const user = await api.resumeSession()

        if (!user) {
            return null
        } else {
            return user
        }
    } catch (err) {
        console.error(err)
        alert(String(err))
        return null
    }
}

export async function logoutUser() {
    try {       
        await api.logoutUser()
        return null
    } catch (err) {
        console.error(err)
        alert(String(err))
        return null
    }
}