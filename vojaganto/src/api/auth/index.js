import * as http from "utils/http"

const user = {
    username: "rainyuxuan",
    name: "Rain-Yuxuan",
    _id: "soudh9wqhd12hd12-0e1",
    role: "client",
    status: "active"
}

const admin = {
    username: "admin",
    name: "Admin-Yuxuan",
    _id: "so213123d12hd12-0e1",
    role: "admin",
    status: "active"
}


export async function clientLogin(username, password) {
    try {
        // const response = http.post("/api/login", { username, password })
        const response = username === "user" ? user : null
        return response
    } catch (err) {
        throw err
    }
}

export async function adminLogin(username, password) {
    try {
        // const response = http.post("/api/login", { username, password })
        const response = username === "admin" ? admin : null
        return response
    } catch (err) {
        throw err
    }
}


export async function clientRegister(username, password) {
    try {
        // const response = http.post("/api/user", { username, password })
        const response = username === "user" ? null : user
        return response
    } catch (err) {
        throw err
    }
}
