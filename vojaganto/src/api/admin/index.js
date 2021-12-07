import * as http from "utils/http"

export async function fetchPostings(params) {
    try {
        const {response, body} = await http.get("/api/posting", params)
        if (response.status === 200){
            return body
        }else {
            return null
        }
    } catch (err) {
        throw err
    }
}


export async function fetchUsers(params) {
    try {
        const {response, body} = await http.get("/api/admin/user", params)
        if (response.status === 200){
            return body
        }else {
            return null
        }
    } catch (err) {
        throw err
    }
}

export async function changeUserStatus(user, data) {
    try {
        const {response, body} = await http.put(`/api/admin/user/${user._id}`, { ...user, ...data })
        if (response.status === 200){
            return body
        }else {
            return null
        }
    } catch (err) {
        throw err
    }
}

export async function deletePosting(pid) {
    try {
        const {response, body} = await http.del(`/api/admin/posting/${pid}`)
        if (response.status === 200){
            return body
        }else {
            return null
        }
    } catch (err) {
        throw err
    }
}