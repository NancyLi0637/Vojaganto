import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import "./App.scss";

import * as action from "actions/Auth";

const user = {
  username: "user1",
  name: "user1",
  _id: "61aa84eb00aeb98b84e2d29a",
  role: "client",
  status: "active"
}

const TEST = false

class App extends React.Component {
  state = {
    currUser: TEST ? user : null
  }

  async setResumeUser() {
    const user = await action.resumeSession()
    if (!TEST) {
      this.setState({ currUser: user })
    }
  }

  componentDidMount() {
    this.setResumeUser()
  }

  render() {
    return (
      <BrowserRouter>
        <RenderRoutes currUser={this.state.currUser} setCurrUser={(newUser) => action.setCurrUser(this, newUser)} />
      </BrowserRouter>
    );
  }
}

export default App;
