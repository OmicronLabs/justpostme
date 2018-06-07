import React from "react";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";

import ManagePages from "./containers/dashboardPage/ManagePagesContainer";
import PageControl from "./containers/pageControl/PageControlContainer";
import WelcomePage from "./containers/welcomePage/WelcomePageContainer";
import AboutPage from "./components/aboutPage/AboutPage";
import SubmissionForm from "./containers/submissionForm/SubmissionFormContainer";

class Routes extends React.Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={WelcomePage} />
        <Route path="/about" component={AboutPage} />
        <Route
          path="/pages"
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
        <Route
          path="/page/:id"
          render={props => {
            return loggedIn ? (
              <PageControl />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }}
        />
        <Route path="/form/:id" render={() => <SubmissionForm />} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default Routes;
