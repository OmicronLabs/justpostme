//@flow

import React from "react";

import styled from "styled-components";

import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import MyPagesSection from "./MyPagesSection";

const DashboardWrapper = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
  display: flex: 
  flex-direction: column;
  overflow: hidden;
`;

const DashboardSidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

type Props = {
  children: any
};

class DashboardPage extends React.Component<Props> {
  render() {
    return (
      <DashboardWrapper>
        <NavBar />
        <DashboardSidebarWrapper>{this.props.children}</DashboardSidebarWrapper>
      </DashboardWrapper>
    );
  }
}

export default DashboardPage;
