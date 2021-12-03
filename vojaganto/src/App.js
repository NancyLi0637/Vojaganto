import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import "./App.scss";

import * as action from "actions/Auth";

class App extends React.Component {
  state = {
    currUser: null
  }

  async setResumeUser() {
    const user = await action.resumeSession()
    this.setState({currUser: user})
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
