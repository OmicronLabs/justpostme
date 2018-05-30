//@flow

import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import Routes from "./Routes";
import { PersistGate } from "redux-persist/integration/react";
import persistedStore from "./store";

const { store, persistor } = persistedStore();

class App extends React.Component<void> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route component={Routes} />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
