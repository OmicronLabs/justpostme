//@flow

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";

import MainPage from "./components/MainPage/MainPage";

class App extends React.Component<void> {
  render() {
    return (
      <Router>
        <Route component={() => <MainPage />} />
      </Router>
    );
  }
}

export default App;
