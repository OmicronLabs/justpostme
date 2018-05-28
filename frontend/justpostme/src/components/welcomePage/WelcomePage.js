//@flow

import React, { Component } from "react";
import styled, { CSS } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

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

const RoundButton = styled.a`
  text-decoration: none;
  display: inline-block;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 30px;
`;

const StartButton = RoundButton.extend`
  color: rgb(255, 87, 34);
  font-size: 1.3em;
  border-color: rgb(255, 87, 34);
  &:hover {
    color: rgba(255, 87, 34, 0.7);
    border: 2px solid rgba(255, 87, 34, 0.7);
  }
`;

const TopMenuButton = RoundButton.extend`
  color: white;
  border-color: white;
  &:hover {
    color: whitesmoke;
    border: 2px solid whitesmoke;
  }
`;

const SimpleFooter = styled.footer`
  position: fixed;
  width: 100%;
  height: 30px;
  text-align: center;
  bottom: 0px;
`;

const FooterButton = styled.a`
  text-decoration: none;
  color: grey;
  padding-bottom: 10px;
  &:hover {
    color: darkgray;
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

const WelcomePage = () => (
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
      <Box>
        <About>{AboutText}</About>
        <StartButton>
          <Link to={{ pathname: "/mainpage" }}>Get started with Facebook </Link>
        </StartButton>
      </Box>
    </BoxWrapper>
    <SimpleFooter>
      <FooterButton
        href="https://github.com/OmicronLabs/justpostme"
        target="blank"
      >
        <i className="fa fa-github" /> view the source code
      </FooterButton>
    </SimpleFooter>
  </FrontDoorRelative>
);

class Welcome extends React.Component<void> {
  render() {
    return <WelcomePage />;
  }
}

export default WelcomePage;
