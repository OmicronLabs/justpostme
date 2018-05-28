//@flow

import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";

import Routes from "./Routes";

class App extends React.Component<void> {
  render() {
    return (
      <Router>
        <Route component={Routes} />
      </Router>
    );
  }
}

export default App;
