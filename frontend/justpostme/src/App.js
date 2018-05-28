//@flow

import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";

import MainPage from "components/mainPage/MainPage";
import WelcomePage from "components/welcomePage/WelcomePage";

class App extends React.Component<void> {
  render() {
    return (
      <Router>
        <Route component={() => <WelcomePage />} />
      </Router>
    );
  }
}

export default App;
