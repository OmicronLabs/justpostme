//@flow

import React, { Component } from "react";
import styled, { CSS } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "bulma/css/bulma.css";

import {
  Button,
  Hero,
  HeroBody,
  Container,
  Title
} from "react-bulma-components";
// Create a Title component that'll render an <h1> tag with some styles

const WelcomePage = () => (
  <div>
    <div className="hero is-bold is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">justpost.me</h1>
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-3" />
      <div className="column is-6">
        <br />
        <div className="box has-text-centered">
          <p>
            Welcome to justpost.me, a simple anonymous user-content Facebook
            page manager with many features.
          </p>
          <br />
          <a href="#" className="button is-primary has-text-centered">
            Get Started
          </a>
        </div>
      </div>
      <div className="column is-3" />
    </div>
  </div>
);

class Welcome extends React.Component<void> {
  render() {
    return <WelcomePage />;
  }
}

export default Welcome;
