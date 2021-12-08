import * as api from "api/profile"
import { getUserPostings } from "api/posting"
import { redirectToPage, reloadPage } from "actions"

/**
 * Set component state.profileInfo to profile owner's info.
 * @param {*} component 
 * @param {*} uid 
 */
export async function setProfileInfo(component, uid) {
    try {
        console.log(`Getting Profile for user ${uid}`)
        const profileInfo = await api.fetchProfile(uid)
        if (profileInfo) {
            component.setState({ profileInfo })
        } else {
            alert("Cannot find user")
            redirectToPage("/")
        }
    } catch (err) {
        console.error(err)
        alert(String(err))
    }
}

/**
 * Submit profile edit.
 * @param {*} component 
 * @param {*} uid 
 * @param {*} body 
 */
export async function updateProfileInfo(component, uid, body) {
    if (!("_id" in body)) {
        body._id = uid
    }

    console.log("Action receive body", body)

    const data = new FormData()
    for (let key in body) {
        data.append(
            key,
            body[key]
        )
        console.log("Form append", key, ": ", data[key])
    }

    console.log("Update file data", JSON.parse(JSON.stringify(data)))

    try {
        // console.log("Update profile", body)
        const newProfile = await api.updateProfile(uid, data)
        console.log("Updated profile", newProfile)
        if (newProfile) {
            alert("Updated profile!")
            reloadPage()
        } else {
            alert("Update failed!")
        }

    } catch (err) {
        console.error(err)
        // alert(String(err))
    }
}

/**
 * Set component state.journey to profile owner's journeys.
 * @param {*} component 
 * @param {*} uid 
 */
export async function setProfileJourneys(component, uid) {
    try {
        const journeys = await getUserPostings(uid)
        console.log("Getting user's journeys", journeys)
        if (journeys) {
            component.setState({ journeys })
        }
    } catch (err) {
        console.error(err)
    }
}