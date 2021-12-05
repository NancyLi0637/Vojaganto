import * as http from "utils/http"

const postings = [
    {
        _id: 1,
        author: "user1",
        title: "This is a post",
        journey: {
            _id: "asdiqwodn",
            title: "Journey to Toronto"
        },
        publishTime: (new Date()).toISOString()
    },
    {
        _id: 2,
        author: "user2",
        title: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
        journey: {
            _id: "asdiqwodn",
            title: "Journey to Toronto"
        },
        publishTime: new Date().toISOString()
    }
]
// This data will be pull from server
const users = [
    {
        _id: "asdn1d2d1d0",
        username: "user1",
        nickname: "abc",
        lastLogin: new Date().toISOString(),
        status: "active",
        role: "client"
    },
    {
        _id: "asdn1asdsd0",
        username: "user2",
        nickname: "def",
        lastLogin: new Date().toISOString(),
        status: "inactive",
        role: "client"
    }
]

export async function fetchPostings(params) {
    try {
        const {response, body} = await http.get("/api/posting", params)
        // let response = postings
        // return response
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

export async function changeUserStatus(user, toStatus) {
    try {
        const {response, body} = await http.put(`/api/admin/user/${user._id}`, { ...user, active: toStatus })
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