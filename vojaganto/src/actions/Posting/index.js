
import * as api from "api/posting"

export async function setHomePostingColumns(component, search) {
    try {
        console.log("Searching for", search)
        const homePostings = await api.getHomePostings({ search })
        if (homePostings) {
            console.log(homePostings)
            const postingCardColumns = [{ postings: [] }, { postings: [] }, { postings: [] }]

            // Add postings to three columns
            homePostings.forEach((posting, i) => {
                postingCardColumns[i % 3].postings.push(posting)
            })

            component.setState({ postingCardColumns })
        }
    } catch (err) {
        alert(String(err))
    }
}