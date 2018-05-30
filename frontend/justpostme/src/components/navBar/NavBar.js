//@flow

import React from "react";
import styled from "styled-components";
import { RoundButton, TopMenuButton } from "../common/Buttons";

import navBarImage from "../../media/banner-bg-2.png";
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
  height: 45px;
  box-shadow: 5px 5px 19px 3px rgba(126, 149, 168, 0.2);
  z-index: 3;
  border-radius: 3px;
`;

const DropdownContainer = styled.div`
  &:hover ${DropdownMenu} {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
  }
`;

const DropdownButton = RoundButton.extend`
  border: 0px;
  color: gray;
  &:hover {
    color: darkgray;
  }
`;

type Props = {
  userID: string,
  accessToken: string
};

class NavBar extends React.Component<Props> {
  // componentDidMount() {
  //   if (document.getElementById("facebook-jssdk")) {
  //     return;
  //   }
  //   this.setFbAsyncInit();
  //   this.loadSdkAsynchronously();
  // }

  // setFbAsyncInit() {
  //   window.fbAsyncInit = () => {
  //     window.FB.init({
  //       version: `v3.0`,
  //       appId: "2207425962822702"
  //     });
  //   };
  // }

  // loadSdkAsynchronously() {
  //   ((d, s, id) => {
  //     const element = d.getElementsByTagName(s)[0];
  //     const fjs = element;
  //     let js = element;
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = `https://connect.facebook.net/en_US/sdk.js`;
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");
  // }

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
          <NavBarMenuContainer>
            <TopMenuButton onClick={() => {}}>About</TopMenuButton>
            <DropdownContainer>
              <TopMenuButton href="#">Settings</TopMenuButton>
              <DropdownMenu>
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
