//@flow

import React, { Component } from "react";
import styled, { CSS } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "bulma/css/bulma.css";

import { Button } from "react-bulma-components";
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const WelcomeHeader = styled.header`
background: deepskyblue;
  background-image: url("media/page-bg.jpg"));
  height: 150px;
  padding: 20px;
  color: white;
`;

const WelcomeTitle = styled.h1`
  padding-top: 2.5%;
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
`;

const AboutText =
  "A simple way to manage posts to all your anonymous-post Facebook pages.";

const AboutContainer = styled.div`
  padding: 20%;
  padding-top: 5%;
  padding-bottom: 5%;
  align: center;
  text-align: center;
`;

const About = styled.p`
  font-size: large;
  text-align: center;
`;

const WelcomePage = () => (
  <div className="Welcome">
    <WelcomeHeader>
      <WelcomeTitle>Welcome to justpost.me</WelcomeTitle>
    </WelcomeHeader>
    <AboutContainer>
      <About>{AboutText}</About>
      <br />
      <StartButton href="#">Get started</StartButton>
    </AboutContainer>
  </div>
);

class Welcome extends React.Component<void> {
  render() {
    return <WelcomePage />;
  }
}

export default Welcome;
