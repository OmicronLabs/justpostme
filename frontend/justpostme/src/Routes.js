import React from "react";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";

import DashboardPage from "./components/dashboardPage/DashboardPage";
import WelcomePage from "./components/welcomePage/WelcomePage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={WelcomePage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default Routes;
