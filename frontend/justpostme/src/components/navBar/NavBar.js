//@flow

import React from "react";
import styled, { CSS } from "styled-components";

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
  justify-content: space-between;
  align-items: center;
  height: 70px;
  box-sizing: border-box;
`;

class NavBar extends React.Component<void> {
  render() {
    return (
      <NavBarOuter>
        <NavBarInner />
      </NavBarOuter>
    );
  }
}

export default NavBar;
