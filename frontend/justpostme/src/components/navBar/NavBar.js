//@flow

import React from "react";
import styled, { CSS } from "styled-components";
import { RoundButton, TopMenuButton } from "../common/Buttons";

const NavBarOuter = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  background-color: red;
  background-image: url("../../media/banner-bg.png");
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

class NavBar extends React.Component<void> {
  render() {
    return (
      <NavBarOuter>
        <NavBarInner>
          <RoundButton>About</RoundButton>
          <RoundButton>Settings</RoundButton>
        </NavBarInner>
      </NavBarOuter>
    );
  }
}

export default NavBar;
