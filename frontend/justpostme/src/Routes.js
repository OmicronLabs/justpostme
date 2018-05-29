import React from "react";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";

import ManagePages from "./components/dashboardPage/ManagePages";
import WelcomePage from "./containers/welcomePage/WelcomePageContainer";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={WelcomePage} />
        <Route path="/dashboard" component={ManagePages} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default Routes;
