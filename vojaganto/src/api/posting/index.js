import * as http from "utils/http"
import { redirectToPage } from "actions"


//*********************************  HOME PAGE ************************************//
/**
 * Get postings for the home page
 */
async function getHomePostings(params) {
    try {
        const { response, body } = await http.get(`/api/posting`, params)
        if (response.status === 200) {
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}

//*********************************  POSTING PAGE ************************************//
/**
 * Get the data of a posting, including author and journey. For view and edit posting.
 * @param {*} pid 
 * @returns 
 */
async function getPosting(pid) {
    try {
        const { response, body } = await http.get(`/api/posting/${pid}`)
        if (response.status === 200) {
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}

//*********************************  EDIT POSTING ************************************//
/**
 * Create a posting.
 * @param {*} data 
 * @returns 
 */
async function createPosting(data) {
    try {
        console.log("Posting ", data)
        const { response, body } = await http.post('/api/posting', data)
        if (response.status === 200) {
            return body
        } else if (response.status === 401) {
            alert("Session expired, please login again!")
            redirectToPage('/')
            return null
        } else {
            return null
        }
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
        const { response, body } = await http.put(`/api/posting/${pid}`, data)
        if (response.status === 200) {
            return body
        } else if (response.status === 401) {
            alert("Session expired, please login again!")
            redirectToPage('/')
            return null
        } else {
            return null
        }
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
        const { response, body } = await http.del(`/api/posting/${pid}`)
        if (response.status === 200) {
            return body
        } else if (response.status === 401) {
            alert("Session expired, please login again!")
            redirectToPage('/')
            return null
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}


//*********************************  PROFILE PAGE ************************************//
/**
 * Get a list of journeys of the user, with meta-information 
 * about the trips of each journey, for posting-edit.
 * @param {*} uid 
 * @returns 
 */
async function getUserJourneys(uid) {
    try {
        const { response, body } = await http.get(`/api/user/${uid}/journey`)
        if (response.status === 200) {
            return body
        } else if (response.status === 401) {
            alert("Session expired, please login again!")
            redirectToPage('/')
            return null
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}

//*********************************  JOURNET PAGE ************************************//
/**
 * Get a journey and its postings
 * @param {*} jid 
 * @returns 
 */
async function getJourney(jid) {
    try {
        const { response, body } = await http.get(`/api/journey/${jid}`)
        if (response.status === 200) {
            console.log("journey", body)
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}


/**
 * Create a journey
 * @param {*} body 
 * @returns 
 */
export async function postJourney(authorId, data) {
    try {
        const { response, body } = await http.post(`/api/user/${String(authorId)}/journey`, data)
        if (response.status === 200) {
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}

/**
 * Update a journey
 * @param {*} body 
 * @returns 
 */
export async function updateJourney(jid, data) {
    try {
        const { response, body } = await http.put(`/api/journey/${String(jid)}`, data)
        if (response.status === 200) {
            return body
        } else {
            return null
        }
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
        const { response, body } = await http.del(`/api/journey/${String(jid)}`)
        if (response.status === 200) {
            return body
        } else {
            return null
        }
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
        const { response, body } = await http.get(`/api/user/${uid}/posting`)
        if (response.status === 200) {
            return body
        } else {
            return null
        }
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