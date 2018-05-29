//@flow

import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./store";
import Routes from "./Routes";

const store = createStore(rootReducer);

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
