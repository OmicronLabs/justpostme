//@flow

import React from "react";
import styled from "styled-components";
import { DashboardWrapper } from "./DashboardPage.style";
import NavBarContainer from "../../containers/navBar/NavBarContainer";
import SideBar from "../../components/sideBar/SideBar";
import MyPagesSection from "./MyPagesSection";

type Props = {
  children: any
};

class DashboardPage extends React.Component<Props> {
  render() {
    return (
      <DashboardWrapper>
        <NavBarContainer />
        {this.props.children}
      </DashboardWrapper>
    );
  }
}

export default DashboardPage;
