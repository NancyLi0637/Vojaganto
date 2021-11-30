import * as api from "api/profile"
import { getUserJourneys } from "api/posting"

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

export async function updateProfileInfo(component, uid, body) {
    if (!("_id" in body)) {
        body._id = uid
    }

    try {
        // console.log("Update profile", body)
        const newProfile = await api.updateProfile(uid, body)
        console.log("Updated profile", newProfile)
        alert("Updated profile!")
        window.location.reload(false);
    } catch(err) {
        console.error(err)
        alert(String(err))
    }
}
