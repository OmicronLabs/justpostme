import React from "react";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";

import MainPage from "./components/mainPage/MainPage";
import WelcomePage from "./components/welcomePage/WelcomePage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={WelcomePage} />
        <Route path="/mainpage" component={MainPage} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default Routes;
