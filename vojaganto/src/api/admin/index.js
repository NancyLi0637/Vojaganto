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
        // const response = await http.get("/api/admin/posting", params)
        let response = postings
        return response
    } catch (err) {
        throw err
    }
}


export async function fetchUsers(params) {
    try {
        // const response = await http.get("/api/admin/user", params)
        let response = users
        return response
    } catch (err) {
        throw err
    }
}

export async function changeUserStatus(user, toStatus) {
    try {
        // const response = await http.put(`/api/admin/user/${user._id}`, { ...user, status: toStatus })
        let response = users[0]
        return response
    } catch (err) {
        throw err
    }
}

export async function deletePosting(pid) {
    try {
        // const response = await http.del(`/api/admin/posting/${pid}`)
        let response = postings[0]
        return response
    } catch (err) {
        throw err
    }
}