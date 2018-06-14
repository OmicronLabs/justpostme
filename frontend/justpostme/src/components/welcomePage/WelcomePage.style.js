import React from "react";
import styled from "styled-components";
import { Box, BoxWrapper } from "../common/Box";

export const LogoWhite = styled.img`
  user-select: none;
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
  user-select: none;
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
  font-size: 20px;
  padding: 2em;
  text-align: center;
  color: gray;
  font-weight: bold;
`;

export const BackgroundShape = styled.img`
  position: absolute;
  width: 100%;
  left: 0;
  top: 400px;
  transform: translateY(-99%);
`;

export const WelcomePageBox = Box.extend`
  padding: 3em;
  margin-top: 190px;
  height: 230px;
  width: 760px;
  max-width: 800px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PageMetaBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const MetaCountupBox = styled.div`
  box-shadow: 0px 0px 4px 3px rgba(126, 149, 168, 0.5);
  border-radius: 6px;
  background: white;
  display: flex;
  padding: 5px;
`;

export const PageMetaText = styled.p`
  margin: 0 10px;
  font-size: 18px;
  font-weight: 500;
  color: gray;
`;

export const PageMetaWrapper = styled.div``;
