//@flow

import React from "react";

import styled from "styled-components";

import NavBar from "../../components/navBar/NavBar";

const DashboardWrapper = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
`;

const DashboardPage = () => (
  <DashboardWrapper>
    <NavBar />
  </DashboardWrapper>
);

export default DashboardPage;
