import React from "react";
import styled, { CSS } from "styled-components";

export const SimpleFooter = styled.footer`
  position: fixed;
  width: 100%;
  height: 30px;
  text-align: center;
  bottom: 0px;
`;

export const FooterButton = styled.a`
  text-decoration: none;
  color: grey;
  padding-bottom: 10px;
  &:hover {
    color: darkgray;
  }
`;

export const GitHubFooter = () => (
  <FooterButton href="https://github.com/OmicronLabs/justpostme" target="blank">
    <i className="fa fa-github" /> view the source code
  </FooterButton>
);
