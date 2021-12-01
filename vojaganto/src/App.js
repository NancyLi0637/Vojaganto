import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import "./App.scss";

import { setCurrUser } from "actions/Auth";

class App extends React.Component {
  state = {
    currUser: { username: "admin", _id: "d129ye1gsdb12oud", role: "client"}
  }

  render() {
    return (
      <BrowserRouter>
        <RenderRoutes currUser={this.state.currUser} setCurrUser={(newUser) => setCurrUser(this, newUser)} />
      </BrowserRouter>
    );
  }
}

export default App;
