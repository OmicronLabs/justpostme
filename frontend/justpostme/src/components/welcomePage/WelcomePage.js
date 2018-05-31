//@flow

import React, { Component } from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link, withRouter } from "react-router-dom";

import { LargeThemedButton, TopMenuButton } from "../common/Buttons";
import { Box, BoxWrapper } from "../common/Box";
import { SimpleFooter, GitHubFooter } from "../common/Footer";
import background from "../../media/LoginBackground.svg";
import logo from "../../media/logo-white.png";
import type { User } from "../../containers/welcomePage/WelcomePageContainer";
import Spinner from "../loadingSpinner/LoadingSpinner";
import { ErrorWrapper } from "../dashboardPage/PagesDisplay.style";
import {
  ErrorDisplay,
  ErrorSubHeader,
  ErrorTextDark,
  ErrorLink
} from "../common/ErrorText";
import {
  FrontDoorRelative,
  FrontDoorBackgroundBottom,
  FrontDoorBackgroundTop,
  HeaderLogoText,
  HeaderTopLeft,
  HeaderTopRight,
  LogoWhite,
  BackgroundShape,
  WelcomePageBox,
  About
} from "./WelcomePage.style";

const aboutText =
  "Welcome to justpost.me, a simple way to manage user-submitted content for your anonymous Facebook pages.";

const loadingText = "Loading.";

const errorHead = "Something went wrong :(";

const responseFacebook = (response, addUser, logIn) => {
  if (response && response.id) {
    const user = {
      userID: response.id,
      accessToken: response.accessToken,
      email: response.email,
      expiresIn: response.expiresIn,
      name: response.first_name
    };
    addUser(user);
    logIn();
  }
};

type Props = {
  history: Object,
  loggedIn: boolean,
  posting: boolean,
  error: string,
  addUser: (user: User) => void,
  logIn: () => void
};

const ErrorComponent = () => (
  <ErrorWrapper>
    <ErrorSubHeader>{errorHead}</ErrorSubHeader>
    <ErrorTextDark>
      {"Please "}
      <ErrorLink href=".">try again!</ErrorLink>
    </ErrorTextDark>
  </ErrorWrapper>
);

class Welcome extends React.Component<Props> {
  componentWillReceiveProps(newProps: Props) {
    const { loggedIn, posting, history } = this.props;
    if (
      posting &&
      loggedIn &&
      newProps.loggedIn &&
      !newProps.posting &&
      !newProps.error
    ) {
      history.push("/pages");
    }
  }

  render() {
    const { addUser, logIn, posting, error } = this.props;

    return (
      <FrontDoorRelative>
        <FrontDoorBackgroundTop>
          <HeaderTopLeft>
            <LogoWhite src={logo} />
            <HeaderLogoText>justpost.me</HeaderLogoText>
          </HeaderTopLeft>
          <HeaderTopRight>
            <TopMenuButton href="#">About</TopMenuButton>
          </HeaderTopRight>
        </FrontDoorBackgroundTop>
        <BackgroundShape src={background} className="" />
        <FrontDoorBackgroundBottom />
        <BoxWrapper>
          <WelcomePageBox>
            <About>
              {!posting && !error ? (
                aboutText
              ) : posting && !error ? (
                loadingText
              ) : (
                <ErrorComponent />
              )}
            </About>
            {!posting && !error ? (
              posting ? (
                <Spinner />
              ) : (
                <FacebookLogin
                  appId="2207425962822702"
                  // autoLoad={true}
                  size={"small"}
                  fields="first_name,email,picture"
                  scope="manage_pages, email, publish_pages"
                  render={renderProps => (
                    <LargeThemedButton onClick={renderProps.onClick}>
                      Get started with Facebook
                    </LargeThemedButton>
                  )}
                  callback={response =>
                    responseFacebook(response, addUser, logIn)
                  }
                />
              )
            ) : null}
          </WelcomePageBox>
        </BoxWrapper>
        <SimpleFooter>
          <GitHubFooter />
        </SimpleFooter>
      </FrontDoorRelative>
    );
  }
}

export default Welcome;
