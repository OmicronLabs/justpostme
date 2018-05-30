import React from "react";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";

import ManagePages from "./components/dashboardPage/ManagePages";
import WelcomePage from "./containers/welcomePage/WelcomePageContainer";

class Routes extends React.Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={WelcomePage} />
        <Route
          path="/dashboard"
          render={props => {
            return loggedIn ? (
              <ManagePages />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }}
        />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default Routes;
