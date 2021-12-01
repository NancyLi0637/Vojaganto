import * as api from "api/profile"
import { getUserPostings } from "api/posting"
import { reloadPage } from "actions"

/**
 * Set component state.profileInfo to profile owner's info.
 * @param {*} component 
 * @param {*} uid 
 */
export async function setProfileInfo(component, uid) {
    try {
        console.log(`Getting Profile for user ${uid}`)
        const profileInfo = await api.fetchProfile(uid)
        component.setState({ profileInfo })

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

    try {
        // console.log("Update profile", body)
        const newProfile = await api.updateProfile(uid, body)
        console.log("Updated profile", newProfile)
        alert("Updated profile!")
        reloadPage()
    } catch (err) {
        console.error(err)
        alert(String(err))
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
        component.setState({ journeys })
    } catch (err) {
        console.error(err)
        alert(String(err))
    }
}