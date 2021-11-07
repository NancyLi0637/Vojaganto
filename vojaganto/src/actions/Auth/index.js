function setCurrUser(app, newUser) {
    console.log("Set Curr User", newUser)
    app.setState({ currUser: newUser })
}

export { setCurrUser }