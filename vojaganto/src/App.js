import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import "./App.scss";


import { setCurrUser } from "actions/Auth";

const mockUser = {
  uid: 0,
  username: 'user',
  password: 'user',
  name: 'User Doe',
  role: 0
}

const mockAdmin = {
  uid: 1,
  username: 'admin',
  password: "admin",
  name: 'Admin doe',
  role: 1
}

class App extends React.Component {
  state = {
    currUser: null 
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
