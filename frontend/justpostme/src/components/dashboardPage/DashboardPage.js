//@flow

import React from "react";

import styled from "styled-components";

import NavBar from "../../components/navBar/NavBar";

const DashboardWrapper = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
`;

class DashboardPage extends React.Component<void> {
  render() {
    return (
      <DashboardWrapper>
        <NavBar />
      </DashboardWrapper>
    );
  }
}

export default DashboardPage;
