import * as http from "utils/http"
import avatar from 'assets/images/66385278_p8.jpg';
import img1 from 'assets/images/home/pic1.jpg';
import img2 from 'assets/images/home/pic3.jpg';

const mockPosting = {
    _id: 5,
    title: "Trip to Toronto",
    author: {
        _id: 0,
        username: "user",
        name: "User Doe",
        avatar: avatar
    },
    journey: {
        _id: 1,
        title: "Journey to Canada"
    },
    date: (new Date()).toLocaleDateString("en-CA"),
    destination: "Toronto, ON, Canada",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    images: [img1, img2]
}

async function getHomePostings(params) {
    try {
        const response = await http.get(`/api/posting`, params)
        return response
    } catch (err) {
        throw err
    }
}

async function getPosting(pid) {
    try {
        // const response = await http.get(`/api/posting/${pid}`)
        const response = mockPosting
        return response
    } catch (err) {
        throw err
    }
}

async function createPosting(data) {
    try {
        // const response = await http.post('/api/posting', data)
        const response = data
        return response
    } catch (err) {
        throw err
    }
}

async function updatePosting(pid, data) {
    try {
        // const response = await http.put(`/api/posting/${pid}`, data)
        const response = data
        return response
    } catch (err) {
        throw err
    }
}

async function deletePosting(pid) {
    try {
        // const response = await http.del(`/api/posting/${pid}`)
        const response = mockPosting
        return response
    } catch (err) {
        throw err
    }
}

async function getUserJourneys(uid) {
    try {
        const response = await http.get(`/api/user/${uid}/journey`)
        return response
    } catch (err) {
        throw err
    }
}

async function getJourney(jid) {
    try {
        const response = await http.get(`/api/journey/${jid}`)
        return response
    } catch (err) {
        throw err
    }
}

async function getUserPostings(uid) {
    try {
        const response = await http.get(`/api/user/${uid}/posting`)
        return response
    } catch (err) {
        throw err
    }
}


export {
    getHomePostings,
    getPosting,
    createPosting,
    updatePosting,
    deletePosting,
    getUserJourneys,
    getJourney,
    getUserPostings
}