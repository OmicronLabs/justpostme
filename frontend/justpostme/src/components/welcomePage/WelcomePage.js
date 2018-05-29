//@flow

import React, { Component } from "react";
import styled, { CSS } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import { RoundButton, TopMenuButton } from "../common/Buttons";

import { Box, BoxWrapper } from "../common/Box";

import { SimpleFooter, FooterButton } from "../common/Footer";

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
          <Link
            to={{ pathname: "/dashboard" }}
            style={{ textDecoration: "none", color: "rgb(255, 87, 34)" }}
          >
            Get started with Facebook{" "}
          </Link>
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
