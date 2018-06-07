//@flow

import React, { Component } from "react";
import styled from "styled-components";

import { Link, withRouter } from "react-router-dom";

import { LargeThemedButton, TopMenuButton } from "../common/Buttons";
import { Box, BoxWrapper } from "../common/Box";
import { SimpleFooter, GitHubFooter } from "../common/Footer";
import background from "../../media/LoginBackground.svg";
import logo from "../../media/logo-white.png";

import {
  FrontDoorRelative,
  FrontDoorBackgroundBottom,
  FrontDoorBackgroundTop,
  HeaderLogoText,
  HeaderTopLeft,
  HeaderTopRight,
  LogoWhite,
  BackgroundShape,
  About
} from "../welcomePage/WelcomePage.style";

const AboutBox = Box.extend`
  padding: 3em;
  margin-top: 190px;
  width: 760px;
  max-width: 800px;
  justify-content: center;
  flex-direction: column;
  overflow: auto;
  margin-bottom: 50px;
`;

const AboutTitle = styled.h1`
  color: gray;
  margin-top: 80px;
  margin-bottom: 0px;
  font-size: 30px;
`;

const Title = AboutTitle.extend`
  margin-top: 0px;
`;

const ListItem = styled.li`
  margin: 5px;
`;

const AboutBody = styled.p`
  color: gray;
  margin-top: 20px;
  margin-bottom: 0px;
  font-size: 18px;
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
              <ol>
                <ListItem>Log in with your facebook account.</ListItem>
                <ListItem>
                  Click on add pages to choose which pages you want to use with
                  justpost.me
                </ListItem>
                <ListItem>
                  A link for the submission form will be generated.
                </ListItem>
                <ListItem>
                  Post this link to your facebook page for your users to be able
                  to submit content
                </ListItem>
              </ol>
            </AboutBody>
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
