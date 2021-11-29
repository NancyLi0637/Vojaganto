import * as http from "utils/http"
import avatar from 'assets/images/66385278_p8.jpg';
import img1 from 'assets/images/home/pic1.jpg';
import img2 from 'assets/images/home/pic3.jpg';
import pic1 from "assets/images/home/pic1.jpg";
import pic2 from "assets/images/home/pic2.jpeg";
import pic3 from "assets/images/home/pic3.jpg";
import pic4 from "assets/images/home/pic4.jpg";
import pic5 from "assets/images/home/pic5.jpg";
import pic6 from "assets/images/home/pic6.jpg";
import pic8 from "assets/images/home/pic8.jpg";

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


const postingCardColumns = [
    {
        postings: [
            {
                _id: 1,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic1],
            },
            {
                _id: 2,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic4],
            },
        ],
    },
    {
        postings: [
            {
                _id: 3,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic3],
            },
            {
                _id: 4,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic6],
            },
            {
                _id: 5,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic8],
            }
        ],
    },
    {
        postings: [
            {
                _id: 6,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic5],
            },
            {
                _id: 7,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic2],
            },
        ],
    },
];

async function getHomePostings(params) {
    try {
        // const response = await http.get(`/api/posting`, params)
        const response = postingCardColumns
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
        const response = {...data, _id: 66}
        return response
    } catch (err) {
        throw err
    }
}

async function updatePosting(pid, data) {
    try {
        // const response = await http.put(`/api/posting/${pid}`, data)
        // console.log("Update", data)
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
        // const response = await http.get(`/api/user/${uid}/journey`)
        const response = [
            {
                _id: "sdhoiwd1oi2hd12dh21213",
                title: "Journey to Canada"
            }, {
                _id: "sdhsaddsai2hd12dh21213",
                title: "Journey to Toronto"
            }, {
                _id: "sd123wd1oi2hd12dh21213",
                title: "Journey to Montreal"
            }
        ]
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