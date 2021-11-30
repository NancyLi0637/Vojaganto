import * as api from "api/admin"

export async function deletePost(component, post) {
  try {
    // const filteredPosts = component.state.posts.filter(p => {
    //   return p.id !== post.id;
    // });

    // component.setState({
    //   posts: filteredPosts
    // });
    alert(`Deleted post ${post._id}`)
  } catch (err) {
    console.error(err)
    alert(String(err))
  }

};


export async function getPostings(component, params) {
  try {
    console.log("Searching postings", params)
    const postings = await api.fetchPostings(params)

    component.setState({postings})
  } catch (err) {
    console.error(err)
    alert(String(err))
  }
}


export async function getUsers(component, params) {
  try {
    console.log("Searching users", params)
    const users = await api.fetchUsers(params)

    component.setState({users})
  } catch (err) {
    console.error(err)
    alert(String(err))
  }
}


export async function inactivateUser(component, user) {
  try {
    // console.log("Searching users", params)
    // const users = await api.fetchUsers(params)

    // component.setState({users})
    alert(`Inactivated user ${user._id}`)
  } catch (err) {
    console.error(err)
    alert(String(err))
  }
}