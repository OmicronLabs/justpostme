//@flow

import React from "react";
import styled, { CSS } from "styled-components";
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NavBarLogoContainer = NavBarContainer.extend`
  height: 70px;
  justify-content: flex-start;
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
          <NavBarContainer>
            <TopMenuButton onClick={() => {}}>About</TopMenuButton>
            <TopMenuButton href="#">Settings</TopMenuButton>
          </NavBarContainer>
        </NavBarInner>
      </NavBarOuter>
    );
  }
}

export default NavBar;
