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

const author = {
    _id: "userid",
    username: "user",
    name: "User Doe",
    description: "Lorem ipsum dtque quo itaque? qsum sit.",
    avatar: avatar
}

const mockPosting = {
    _id: 5,
    title: "Trip to Toronto",
    author,
    journey: {
        _id: 1,
        title: "Journey to Canada"
    },
    date: (new Date()).toLocaleDateString("en-CA"),
    destination: "Toronto, ON, Canada",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    images: [img1, img2]
}

const postingList = {
    "Travel to Canada": {
        _id: "2d12d12das",
        title: "Travel to Canada",
        author,
        journeyPostings: [
            {
                author,
                _id: 100,
                date: (new Date()).toLocaleDateString("en-CA"),
                title: "Title",
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
                image: [pic1]
            },
            {
                author,
                _id: 101,
                date: (new Date()).toLocaleDateString("en-CA"),
                title: "Hello",
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
                image: [pic2],
            },
            {
                author,
                _id: 102,
                date: (new Date()).toLocaleDateString("en-CA"),
                title: "Demo",
                body: "Travelling and happy",
                image: [pic3],
            },
        ],
    },
    "Travel to North": {
        _id: 1,
        title: "Travel to North",
        author,
        journeyPostings: [
            {
                author,
                _id: 103,
                date: (new Date()).toLocaleDateString("en-CA"),
                title: "Title",
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
                image: [pic5],
            },
        ],
    },
    Traveling: {
        _id: 2,
        title: "Traveling",
        author,
        journeyPostings: [
            {
                author,
                _id: 105,
                date: (new Date()).toLocaleDateString("en-CA"),
                title: "Title",
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
                image: [pic6],
            },
        ],
    },
};


const postingCardColumns = [
    {
        postings: [
            {
                _id: 1,
                title: "Lorem ipsum",
                date: (new Date()).toLocaleDateString("en-CA"),
                images: [pic1],
            },
            {
                _id: 2,
                title: "Lorem ipsum",
                date: (new Date()).toLocaleDateString("en-CA"),
                images: [pic4],
            },
        ],
    },
    {
        postings: [
            {
                _id: 3,
                title: "Lorem ipsum",
                date: (new Date()).toLocaleDateString("en-CA"),
                images: [pic3],
            },
            {
                _id: 4,
                title: "Lorem ipsum",
                date: (new Date()).toLocaleDateString("en-CA"),
                images: [pic6],
            },
            {
                _id: 5,
                title: "Lorem ipsum",
                date: (new Date()).toLocaleDateString("en-CA"),
                images: [pic8],
            }
        ],
    },
    {
        postings: [
            {
                _id: 6,
                title: "Lorem ipsum",
                date: (new Date()).toLocaleDateString("en-CA"),
                images: [pic5],
            },
            {
                _id: 7,
                title: "Lorem ipsum",
                date: (new Date()).toLocaleDateString("en-CA"),
                images: [pic2],
            },
        ],
    },
];


/**
 * Get postings for the home page
 */
async function getHomePostings(params) {
    try {
        // const response = await http.get(`/api/posting`, params)
        const response = postingCardColumns
        return response
    } catch (err) {
        throw err
    }
}


/**
 * Get the data of a posting, including author and journey.
 * @param {*} pid 
 * @returns 
 */
async function getPosting(pid) {
    try {
        // const response = await http.get(`/api/posting/${pid}`)
        const response = mockPosting
        return response
    } catch (err) {
        throw err
    }
}


/**
 * Create a posting.
 * @param {*} data 
 * @returns 
 */
async function createPosting(data) {
    try {
        // const response = await http.post('/api/posting', data)
        const response = { ...data, _id: 66 }
        return response
    } catch (err) {
        throw err
    }
}

/**
 * Edit a posting.
 * @param {*} pid 
 * @param {*} data 
 * @returns 
 */
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

/**
 * Delete a posting. If the journey is empty, delete the journey.
 * @param {*} pid 
 * @returns 
 */
async function deletePosting(pid) {
    try {
        // const response = await http.del(`/api/posting/${pid}`)
        const response = mockPosting
        return response
    } catch (err) {
        throw err
    }
}

/**
 * Get a list of journeys of the user, with meta-information 
 * about the trips of each journey, for posting-edit.
 * @param {*} uid 
 * @returns 
 */
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


/**
 * Get a journey and its postings
 * @param {*} jid 
 * @returns 
 */
async function getJourney(jid) {
    try {
        // const response = await http.get(`/api/journey/${jid}`)
        const response = postingList["Travel to Canada"]
        return response
    } catch (err) {
        throw err
    }
}


/**
 * Create a journey
 * @param {*} body 
 * @returns 
 */
export async function postJourney(body) {
    try {
        // const response = await http.post(`/api/user/${String(body.author._id)}/journey`)
        const response = { ...postingList["Travel to Canada"], title: body.title, author: body.author }
        return response
    } catch (err) {
        throw err
    }
}

/**
 * Update a journey
 * @param {*} body 
 * @returns 
 */
 export async function updateJourney(jid, body) {
    try {
        // const response = await http.put(`/api/journey/${String(jid)}`, body)
        const response = { ...postingList["Travel to Canada"], title: body.title, author: body.author }
        return response
    } catch (err) {
        throw err
    }
}

/**
 * Delete a journey
 * @param {*} body 
 * @returns 
 */
 export async function deleteJourney(jid) {
    try {
        // const response = await http.del(`/api/journey/${String(jid)}`)
        const response = { ...postingList["Travel to Canada"]}
        return response
    } catch (err) {
        throw err
    }
}

/**
 * Return user’s trips and journeys, for the profile page
 * @param {*} uid 
 * @returns 
 */
async function getUserPostings(uid) {
    try {
        // const response = await http.get(`/api/user/${uid}/posting`)
        const response = postingList
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