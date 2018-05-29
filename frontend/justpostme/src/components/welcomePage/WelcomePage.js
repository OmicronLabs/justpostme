//@flow

import React, { Component } from "react";
import styled, { CSS } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { Link, withRouter } from "react-router-dom";

import { RoundButton, TopMenuButton } from "../common/Buttons";

import { Box, BoxWrapper } from "../common/Box";

import { SimpleFooter, FooterButton, GitHubFooter } from "../common/Footer";

import background from "../../media/LoginBackground.svg";
import logo from "../../media/logo-white.png";

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

const StartButton = RoundButton.extend`
  text-decoration: none;
  color: rgb(255, 87, 34);
  font-size: 1.3em;
  border-color: rgb(255, 87, 34);
  &:hover {
    color: rgba(255, 87, 34, 0.7);
    border: 2px solid rgba(255, 87, 34, 0.7);
    cursor: pointer;
  }
`;

const AboutText =
  "Welcome to justpost.me, a simple way to manage user-submitted content for your anonymous Facebook pages.";

const FrontDoorRelative = styled.div`
  position: relative;
`;

const FrontDoorBackgroundTop = styled.div`
  background: linear-gradient(to right, #e91e63, #ff5722);
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

const WelcomePageBox = Box.extend`
  padding-top: 3em;
  padding-bottom: 3em;
  margin-bottom: 12em;
  max-width: 800px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const responseFacebook = (response, history, addUser) => {
  response &&
    response.id &&
    addUser(response.id, response.accessToken) &&
    addUser(response.id, response.accessToken) &&
    history.push("/dashboard/managed");
};

type Props = {
  history: Object,
  addUser: (userID: string, accessToken: string) => void,
  addUserToServer: (userID: string, accessToken: string) => void
};

const Welcome = (props: Props) => {
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
          <About>{AboutText}</About>
          <FacebookLogin
            appId="2207425962822702"
            //autoLoad={true}
            size={"small"}
            fields="name,email,picture"
            scope="manage_pages, email, publish_pages"
            render={renderProps => (
              <StartButton onClick={renderProps.onClick}>
                Get started with Facebook
              </StartButton>
            )}
            callback={response =>
              responseFacebook(response, props.history, props.addUser)
            }
          />
        </WelcomePageBox>
      </BoxWrapper>
      <SimpleFooter>
        <GitHubFooter />
      </SimpleFooter>
    </FrontDoorRelative>
  );
};

export default Welcome;
