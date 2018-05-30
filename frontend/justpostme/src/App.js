//@flow

import React, { Component } from "react";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store";
import Routes from "./Routes";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

class App extends React.Component<void> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={Routes} />
        </Router>
      </Provider>
    );
  }
}

export default App;
