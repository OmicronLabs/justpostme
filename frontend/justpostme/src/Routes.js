import React from "react";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";

import ManagePages from "./containers/dashboardPage/ManagePagesContainer";
import PageControl from "./containers/pageControl/PageControlContainer";
import WelcomePage from "./containers/welcomePage/WelcomePageContainer";
import AboutPage from "./components/aboutPage/AboutPage";
import SubmissionForm from "./containers/submissionForm/SubmissionFormContainer";
import SubmissionInfo from "./containers/submissionInfo/SubmissionInfoContainer";
import { Snackbar } from "./components/common/Snackbar";

class Routes extends React.Component {
  render() {
    const { loggedIn, showSnackbar, snackbarMessage } = this.props;

    return [
      <Snackbar showSnackbar={showSnackbar}>{snackbarMessage}</Snackbar>,
      <Switch>
        <Route
          path="/login"
          component={props => {
            return loggedIn ? <ManagePages /> : <WelcomePage />;
          }}
        />
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
        <Route path="/submission/:id" render={() => <SubmissionInfo />} />
        <Redirect to="/login" />
      </Switch>
    ];
  }
}

export default Routes;
