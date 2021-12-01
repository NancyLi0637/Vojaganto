import { reloadPage } from "actions"
import * as api from "api/admin"

export async function deletePosting(component, posting) {
  try {
    const res = await api.deletePosting(posting._id)
    if (res) {
      alert(`Deleted posting ${posting._id}`)
      reloadPage()
    }
  } catch (err) {
    console.error(err)
    alert(String(err))
  }

};


export async function getPostings(component, params) {
  try {
    console.log("Searching postings", params)
    const postings = await api.fetchPostings(params)

    component.setState({ postings })
  } catch (err) {
    console.error(err)
    alert(String(err))
  }
}


export async function getUsers(component, params) {
  try {
    console.log("Searching users", params)
    const users = await api.fetchUsers(params)

    component.setState({ users })
  } catch (err) {
    console.error(err)
    alert(String(err))
  }
}


export async function changeUserStatus(component, user, toStatus) {
  try {
    // console.log("Searching users", params)
    const res = await api.changeUserStatus(user, toStatus)

    // component.setState({users})
    if (res) {
      if (toStatus === "active") {
        alert(`Activated user ${res._id}`)
      } else {
        alert(`Inactivated user ${res._id}`)
      }
      reloadPage()
    }
  } catch (err) {
    console.error(err)
    alert(String(err))
  }
}