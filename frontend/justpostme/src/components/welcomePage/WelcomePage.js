//@flow

import React, { Component } from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link, withRouter } from "react-router-dom";
import CountUp from "react-countup";
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
  About,
  MetaCountupBox,
  PageMetaBox,
  PageMetaWrapper,
  PageMetaText
} from "./WelcomePage.style";
import { Snackbar } from "../common/Snackbar";

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

  _renderPageMeta() {
    return (
      <PageMetaWrapper>
        <PageMetaBox>
          <PageMetaText>So far we processed</PageMetaText>
          <MetaCountupBox>
            <CountUp
              style={{ color: "rgb(76, 175, 80)", fontWeight: "bold" }}
              start={0}
              end={1347}
              duration={3.5}
              useEasing={true}
              useGrouping={true}
              separator=" "
            />
          </MetaCountupBox>
          <PageMetaText> submissions. </PageMetaText>
        </PageMetaBox>
        <PageMetaBox>
          <PageMetaText>Already </PageMetaText>
          <MetaCountupBox>
            <CountUp
              style={{ color: "rgb(76, 175, 80)", fontWeight: "bold" }}
              start={0}
              end={43}
              duration={3.5}
              useEasing={true}
              useGrouping={true}
              separator=" "
            />
          </MetaCountupBox>
          <PageMetaText> Facebook pages are using our site. </PageMetaText>
        </PageMetaBox>
      </PageMetaWrapper>
    );
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
            <Link to="/about">
              <TopMenuButton href="#">About</TopMenuButton>
            </Link>
          </HeaderTopRight>
        </FrontDoorBackgroundTop>
        <BackgroundShape src={background} className="" />
        <FrontDoorBackgroundBottom />
        <BoxWrapper>
          <WelcomePageBox style={{ display: "flex", minHeight: "300px" }}>
            {!posting && !error ? (
              posting ? (
                <Spinner />
              ) : (
                [
                  <About style={{ marginBottom: "0" }}>{aboutText}</About>,
                  this._renderPageMeta(),
                  <FacebookLogin
                    appId="2207425962822702"
                    // autoLoad={true}
                    size={"small"}
                    fields="first_name,email,picture"
                    scope="manage_pages, email, publish_pages"
                    render={renderProps => (
                      <LargeThemedButton
                        style={{ margin: "40px 0px" }}
                        onClick={renderProps.onClick}
                      >
                        Get started with Facebook
                      </LargeThemedButton>
                    )}
                    callback={response =>
                      responseFacebook(response, addUser, logIn)
                    }
                  />
                ]
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
