//@flow

import React from "react";
import styled, { CSS } from "styled-components";
import { RoundButton, TopMenuButton } from "../common/Buttons";

import navBarImage from "../../media/banner-bg.png";

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
  justify-content: space-evenly;
  align-items: center;
  height: 70px;
  box-sizing: border-box;
`;

const NavBarButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

class NavBar extends React.Component<void> {
  render() {
    return (
      <NavBarOuter>
        <NavBarInner>
          <NavBarButtons>
            <TopMenuButton href="#">About</TopMenuButton>
            <TopMenuButton href="#">Settings</TopMenuButton>
          </NavBarButtons>
        </NavBarInner>
      </NavBarOuter>
    );
  }
}

export default NavBar;
