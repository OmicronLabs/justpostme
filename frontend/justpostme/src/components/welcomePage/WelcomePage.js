//@flow

import React, { Component } from "react";
import styled, { CSS } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";

import background from "media/LoginBackground.svg";
import logo from "media/logo-white.png";

const LogoMono = styled.img`
  transform: scale(0.7, 0.7);
  max-width: 100%;
`;

const LogoHeader = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  height: 100px;
  width: 100px;
  position: absolute;
  display: inline;
`;

const WelcomeTitle = styled.h1`
  text-align: center;
  font-size: 2em;
`;

const StartButton = styled.a`
  text-decoration: none;
  display: inline;
  color: deepskyblue;
  font-size: 1.3em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid deepskyblue;
  border-radius: 30px;
  &:hover {
    color: rgba(0, 191, 255, 0.8);
    border: 2px solid rgba(0, 191, 255, 0.8);
  }
`;

const AboutText =
  "Welcome to justpost.me, a simple way to manage user-submitted content for your anonymous Facebook pages.";

const BoxWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  padding-top: 3em;
  padding-bottom: 3em;
  margin-bottom: 12em;
  max-width: 800px;
  box-shadow: 0px 0px 19px 3px rgba(126, 149, 168, 0.5);
  border-radius: 6px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FrontDoorRelative = styled.div`
  position: relative;
`;

const FrontDoorBackgroundTop = styled.div`
  background: linear-gradient(to right, #649de8, #46d6e0);
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

const WelcomePage = () => (
  <FrontDoorRelative>
    <FrontDoorBackgroundTop>
      <LogoHeader>
        <LogoMono src={logo} />
      </LogoHeader>
    </FrontDoorBackgroundTop>
    <BackgroundShape src={background} className="" />
    <FrontDoorBackgroundBottom />
    <BoxWrapper>
      <Box>
        <About>{AboutText}</About>
        <StartButton href="#">Get started with Facebook</StartButton>
      </Box>
    </BoxWrapper>
  </FrontDoorRelative>
);

class Welcome extends React.Component<void> {
  render() {
    return <WelcomePage />;
  }
}

export default WelcomePage;
