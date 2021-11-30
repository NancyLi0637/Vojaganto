import { getJourney } from "api/posting"

export async function setJourney(component, jid) {
    try {
        const journey = await getJourney(jid)
        console.log(`Get journey ${jid}`, journey)
        component.setState({ ...journey })
    } catch (err) {
        console.error(err)
        alert(String(err))
    }

}