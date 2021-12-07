import { reloadPage } from "actions"
import * as api from "api/admin"

export async function deletePosting(component, posting) {
  try {
    const res = await api.deletePosting(posting._id)
    if (res) {
      alert(`Deleted posting ${posting._id}`)
      getPostings(component, "")
    }
  } catch (err) {
    console.error(err)
    // alert(String(err))
  }

};


export async function getPostings(component, params = "") {
  try {
    console.log("Searching postings", params)
    const postings = await api.fetchPostings(params)
    if (postings) {
      component.setState({ postings })
    }

  } catch (err) {
    console.error(err)
    // alert(String(err))
  }
}


export async function getUsers(component, params = "") {
  try {
    console.log("Searching users", params)
    const users = await api.fetchUsers(params)
    if (users) {
      console.log(users)
      component.setState({ users })
    }

  } catch (err) {
    console.error(err)
    // alert(String(err))
  }
}


export async function changeUserActive(component, user) {
  try {
    // console.log("Searching users", params)
    const data = { active: !user.active }
    const res = await api.changeUserStatus(user, data)

    // component.setState({users})
    if (res) {
      if (user.active) {
        alert(`Inactivated user ${res._id}`)

      } else {
        alert(`Activated user ${res._id}`)
      }
      // reloadPage()
      getUsers(component, "")
    } else {
      console.error("Error when activate/inactive user")
    }
  } catch (err) {
    console.error(err)
    // alert(String(err))
  }
}


export async function changeUserRole(component, user) {
  try {
    const data = { role: user.role === "admin" ? "client" : "admin" }
    const res = await api.changeUserStatus(user, data)

    // component.setState({users})
    if (res) {
      if (user.role === "admin") {
        alert(`Downgraded user ${res._id}`)

      } else {
        alert(`Upgraded user ${res._id}`)
      }
      getUsers(component, "")
    } else {
      console.error("Error when set user's role")
    }
  } catch (err) {
    console.error(err)
    // alert(String(err))
  }
}