import React from "react";
import styled from "styled-components";

import "font-awesome/css/font-awesome.min.css";
import { IconButton } from "./Buttons";

export const SimpleFooter = styled.footer`
  position: fixed;
  width: 100%;
  height: 30px;
  text-align: center;
  bottom: 0px;
`;

export const GitHubFooter = () => (
  <IconButton href="https://github.com/OmicronLabs/justpostme" target="blank">
    <i className="fa fa-github" /> view the source code
  </IconButton>
);
