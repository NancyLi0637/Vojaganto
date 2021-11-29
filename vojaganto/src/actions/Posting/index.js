
import { getHomePostings } from "api/posting"

export async function setHomePostingColumns(component, search) {
    try {
        console.log("Searching for", search)
        const postingCardColumns = await getHomePostings({ search })
        component.setState({ postingCardColumns })
    } catch (err) {

    }
}