//@flow

import React from "react";
import styled, { CSS } from "styled-components";
import { RoundButton, TopMenuButton } from "../common/Buttons";

import navBarImage from "../../media/banner-bg.png";
import logoWhite from "../../media/logo-white.png";

const LogoWhite = styled.img`
  transform: scale(0.7, 0.7);
  width: auto;
  position: relative;
  max-height: 100%;
`;

//TODO: link top left to /dashboard

const HeaderLogoText = styled.h2`
  color: white;
`;

const NavBarOuter = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  background-image: url(${navBarImage});
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const NavBarInner = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  box-sizing: border-box;
`;

const NavBarHomeButton = styled.a`
  text-decoration: none;
`;

const NavBarContainer = styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NavBarLogoContainer = NavBarContainer.extend`
  height: 70px;
  justify-content: flex-start;
`;

class NavBar extends React.Component<void> {
  render() {
    return (
      <NavBarOuter>
        <NavBarInner>
          <NavBarHomeButton>
            <NavBarLogoContainer>
              <LogoWhite src={logoWhite} />
              <HeaderLogoText>justpost.me</HeaderLogoText>
            </NavBarLogoContainer>
          </NavBarHomeButton>
          <NavBarContainer>
            <TopMenuButton href="#">About</TopMenuButton>
            <TopMenuButton href="#">Settings</TopMenuButton>
          </NavBarContainer>
        </NavBarInner>
      </NavBarOuter>
    );
  }
}

export default NavBar;
