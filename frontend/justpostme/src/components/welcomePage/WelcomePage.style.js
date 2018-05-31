import React from "react";
import styled from "styled-components";
import { Box, BoxWrapper } from "../common/Box";

export const LogoWhite = styled.img`
  transform: scale(0.6, 0.6);
  max-width: 100%;
`;

export const HeaderLogoText = styled.h2`
  top: 15px;
  left: 96px;
  position: absolute;
  color: white;
`;

export const HeaderTopRight = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 3;
  height: 100px;
  display: inline;
`;

export const HeaderTopLeft = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  height: 100px;
  width: 100px;
  position: absolute;
  display: inline;
`;
export const FrontDoorRelative = styled.div`
  position: relative;
`;

export const FrontDoorBackgroundTop = styled.div`
  background: linear-gradient(to right, #cddc39, #4caf50);
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 400px;
`;

export const FrontDoorBackgroundBottom = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 400px;
  bottom: 0;
  background: white;
`;

export const About = styled.p`
  font-size: large;
  padding: 2em;
  text-align: center;
`;

export const BackgroundShape = styled.img`
  position: absolute;
  width: 100%;
  left: 0;
  top: 400px;
  transform: translateY(-99%);
`;

export const WelcomePageBox = Box.extend`
  padding-top: 3em;
  margin-left: 1em;
  margin-right: 1em;
  height: 230px;
  width: 800px;
  padding-bottom: 3em;
  margin-bottom: 12em;
  max-width: 800px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
