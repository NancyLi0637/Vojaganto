import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import "./App.scss";


class App extends React.Component {
  state={
    currUser: undefined
  }
  
  render() {
    return (
      <BrowserRouter>
        <RenderRoutes currUser={this.state.currUser} />
      </BrowserRouter>
    );
  }
}

export default App;
