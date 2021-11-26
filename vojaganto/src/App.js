import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import "./App.scss";

import { setCurrUser } from "actions/Auth";

class App extends React.Component {
  state = {
    currUser: {username: "rainyuxuan", _id: 0}
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
