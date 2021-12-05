import * as http from "utils/http"

const user = {
    username: "rainyuxuan",
    name: "Rain-Yuxuan",
    _id: "userid",
    role: "client",
    status: "active"
}

const admin = {
    username: "admin",
    name: "Admin-Yuxuan",
    _id: "userid",
    role: "admin",
    status: "active"
}


export async function clientLogin(username, password) {
    try {
        const { response, body } = await http.post("/api/user/login", { username, password })
        // const response = username === "user" ? user : null
        if (response.status === 200) {
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}

export async function adminLogin(username, password) {
    try {
        const { response, body } = await http.post("/api/user/login", { username, password })
        // const response = username === "admin" ? admin : null
        if (response.status === 200) {
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}


export async function clientRegister(username, password, name) {
    try {
        const { response, body } = await http.post("/api/user", { username, password, name })
        // const response = username === "user" ? null : user
        if (response.status === 200) {
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}


export async function logoutUser() {
    try {
        const { response } = await http.put("/api/user/logout")
        if (response.status === 200) {
            return true
        } else {
            return false
        }
    } catch (err) {
        throw err
    }
}

export async function resumeSession() {
    try {
        const { response, body } = await http.get("/api/user/session/resume")
        if (response.status === 200) {
            console.log("Resuming session", response)
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}
