import React, { Component } from "react";

import { BrowserRouter } from "react-router-dom";
import { AllRoutes } from "../components/config/routesConfig";

import "antd/dist/antd.css";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    );
  }
}

export default App;
