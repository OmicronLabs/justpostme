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

const LogoWhite = styled.img`
  transform: scale(0.6, 0.6);
  max-width: 100%;
`;

const HeaderLogoText = styled.h2`
  top: 15px;
  left: 96px;
  position: absolute;
  color: white;
`;

const HeaderTopRight = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 3;
  height: 100px;
  display: inline;
`;

const HeaderTopLeft = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  height: 100px;
  width: 100px;
  position: absolute;
  display: inline;
`;

const aboutText =
  "Welcome to justpost.me, a simple way to manage user-submitted content for your anonymous Facebook pages.";

const loadingText = "Loading.";

const errorText = "Something went wrong :( Please try again!";

const FrontDoorRelative = styled.div`
  position: relative;
`;

const FrontDoorBackgroundTop = styled.div`
  background: linear-gradient(to right, #cddc39, #4caf50);
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 400px;
`;

const FrontDoorBackgroundBottom = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 400px;
  bottom: 0;
  background: white;
`;

const About = styled.p`
  font-size: large;
  padding: 2em;
  text-align: center;
`;

const BackgroundShape = styled.img`
  position: absolute;
  width: 100%;
  left: 0;
  top: 400px;
  transform: translateY(-99%);
`;

export const WelcomePageBox = Box.extend`
  padding-top: 3em;
  margin-left: 1em;
  margin-right: 1em;
  height: 230px;
  width: 800px;
  padding-bottom: 3em;
  margin-bottom: 12em;
  max-width: 800px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

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
              {!posting && !error
                ? aboutText
                : posting && !error
                  ? loadingText
                  : errorText}
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
