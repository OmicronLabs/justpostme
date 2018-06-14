//@flow

import React, { Component } from "react";
import styled from "styled-components";

import { Link, withRouter } from "react-router-dom";

import { LargeThemedButton, TopMenuButton } from "../common/Buttons";
import { Box, BoxWrapper } from "../common/Box";
import { SimpleFooter, GitHubFooter } from "../common/Footer";
import background from "../../media/LoginBackground.svg";
import logo from "../../media/logo-white.png";
import infographic from "../../media/Infographic.png";

import {
  FrontDoorRelative,
  FrontDoorBackgroundBottom,
  FrontDoorBackgroundTop,
  HeaderLogoText,
  HeaderTopLeft,
  HeaderTopRight,
  LogoWhite,
  BackgroundShape,
  About,
  MetaCountupBox,
  PageMetaBox
} from "../welcomePage/WelcomePage.style";

const AboutBox = Box.extend`
  /* padding: 3em; */
  margin-top: 190px;
  width: 760px;
  max-width: 800px;

  justify-content: center;
  flex-direction: column;
  align-content: center;
  overflow: scroll;
  margin-bottom: 50px;
`;

const AboutTitle = styled.h1`
  color: gray;
  padding-left: 48px;
  margin-top: 80px;
  margin-bottom: 0px;
  font-size: 30px;
`;

const Title = AboutTitle.extend`
  margin-top: 0px;
  padding-top: 48px;
`;

const ListItem = styled.li`
  margin: 5px;
  text-align: center;
`;

const List = styled.ol`
  padding: 0;
  list-style: none;
`;

const AboutBody = styled.p`
  color: gray;
  padding-left: 48px;
  margin-top: 20px;
  margin-bottom: 0px;
  font-size: 18px;
`;

const AboutImg = styled.img`
  margin: auto;
  display: block;
  padding-top: 30px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin: 0px;
  width: 100%;
  height: auto;
`;

const aboutText =
  "Welcome to justpost.me, a simple way to manage user-submitted content for your anonymous Facebook pages.";

const loadingText = "Loading.";

class Welcome extends React.Component<Props> {
  render() {
    return (
      <FrontDoorRelative>
        <FrontDoorBackgroundTop>
          <HeaderTopLeft>
            <LogoWhite src={logo} />

            <HeaderLogoText>justpost.me</HeaderLogoText>
          </HeaderTopLeft>
          <HeaderTopRight>
            <Link to="/home">
              <TopMenuButton href="#">Home</TopMenuButton>
            </Link>
          </HeaderTopRight>
        </FrontDoorBackgroundTop>
        <BackgroundShape src={background} className="" />
        <FrontDoorBackgroundBottom />
        <BoxWrapper>
          <AboutBox>
            <Title>About us</Title>
            <AboutBody>
              justpost.me is a simple manager for your user-created content
              Facebook pages.
            </AboutBody>
            <AboutTitle>How to use justpost.me</AboutTitle>
            <AboutBody>
              Using justpost.me is very simple. Follow these steps to get
              started.
            </AboutBody>
            <AboutImg src={infographic} />
          </AboutBox>
        </BoxWrapper>
        <SimpleFooter>
          <GitHubFooter />
        </SimpleFooter>
      </FrontDoorRelative>
    );
  }
}

export default Welcome;
