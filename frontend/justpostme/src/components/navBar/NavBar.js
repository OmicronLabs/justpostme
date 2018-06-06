//@flow

import React from "react";
import styled from "styled-components";
import { RoundButton, TopMenuButton, DropdownButton } from "../common/Buttons";

import navBarImage from "../../media/banner-bg-3.png";
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
  user-select: none;

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
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NavBarMenuContainer = NavBarContainer.extend`
  margin-top: 12px;
`;

const NavBarLogoContainer = NavBarContainer.extend`
  height: 70px;
  justify-content: flex-start;
`;

const DropdownMenu = styled.div`
  display: none;
  background: white;
  width: 120px;
  min-width: 120px;
  box-shadow: 5px 5px 19px 3px rgba(126, 149, 168, 0.2);
  z-index: 3;
  border-radius: 3px;
`;

const DropdownContainer = styled.div`
  max-width: 120px;
  padding-left: 0px
  width: 120px;
  &:hover ${DropdownMenu} {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-evenly;
  }
`;

type Props = {
  userName: string,
  history: any
};

class NavBar extends React.Component<Props> {
  render() {
    const { userName, history } = this.props;
    return (
      <NavBarOuter>
        <NavBarInner>
          <NavBarHomeButton>
            <NavBarLogoContainer>
              <LogoWhite className="logo" src={logoWhite} />
              <HeaderLogoText className="logoText">justpost.me</HeaderLogoText>
            </NavBarLogoContainer>
          </NavBarHomeButton>
          <NavBarMenuContainer className="navBarMenu">
            <TopMenuButton onClick={() => history.push("/pages")}>
              Home
            </TopMenuButton>
            <TopMenuButton onClick={() => {}}>About</TopMenuButton>
            <DropdownContainer>
              <TopMenuButton href="#">{userName}</TopMenuButton>
              <DropdownMenu>
                <DropdownButton href="#">Settings</DropdownButton>
                <DropdownButton href="#">Log out</DropdownButton>
              </DropdownMenu>
            </DropdownContainer>
          </NavBarMenuContainer>
        </NavBarInner>
      </NavBarOuter>
    );
  }
}

export default NavBar;
