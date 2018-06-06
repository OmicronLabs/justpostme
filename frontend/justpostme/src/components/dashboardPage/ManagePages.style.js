import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RouteTabsWrapper = styled.div`
  width: 1024px;
  max-width: 85%;
  min-height: 60px;
  border-bottom: 1px solid gray;
  background white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const TabButton = styled.div`
  width: 150px;
  user-select: none;
  height: 60px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
