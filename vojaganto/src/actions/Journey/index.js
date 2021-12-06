import { redirectToPage, reloadPage } from "actions"
import * as api from "api/posting"

export async function setJourney(component, jid) {
    try {
        const journey = await api.getJourney(jid)
        console.log(`Get journey ${jid}`, journey)
        if (journey) {
            component.setState({ ...journey })
        }
    } catch (err) {
        console.error(err)
        alert(String(err))
    }

}

export async function createJourney(component, body) {
    try {
        console.log("Submit journey", body)
        const journey = await api.postJourney(body.author._id, { title: body.title })
        if (journey) {
            console.log(`Created journey ${journey._id}`, journey)
            alert(`Created journey ${journey._id}`, journey)
            reloadPage()
        } else {
            alert("Creation Failed!")
        }
    } catch (err) {
        console.error(err)
        // alert(String(err))
    }
}


export async function updateJourney(component, jid, body) {
    try {
        console.log(jid, body)
        const journey = await api.updateJourney(jid, body)
        if (journey) {
            console.log(`Updated journey ${journey._id}`, journey)
            alert(`Updated journey ${journey.title}`)
            reloadPage()
        } else {
            alert("Edit Failed!")
        }
    } catch (err) {
        console.error(err)
        alert(String(err))
    }
}


export async function deleteJourney(component, jid) {
    try {
        const journey = await api.deleteJourney(jid)
        if (journey) {
            console.log(`Deleted journey ${jid}`, journey)
            alert(`Deleted journey ${journey.title}`)
            redirectToPage(`/`, false)
        } else {
            alert("Deletion Failed!")
        }
    } catch (err) {
        console.error(err)
        alert(String(err))
    }
}