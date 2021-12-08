
import * as api from "api/posting"

export async function setHomePostingColumns(component, search) {
    try {
        console.log("Searching for", search)
        const homePostings = await api.getHomePostings({ search })
        if (homePostings) {
            // Add postings to three columns
            const postingCardColumns = [{ postings: [] }, { postings: [] }, { postings: [] }]
            homePostings.forEach((posting, i) => {
                postingCardColumns[i % 3].postings.push(posting)
            })

            // Update view
            component.setState({ postingCardColumns })
        }
    } catch (err) {
        console.error(err)
    }
}