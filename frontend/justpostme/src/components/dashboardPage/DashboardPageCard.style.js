import React from "react";
import styled from "styled-components";
import { Box } from "../common/Box";

export const DashboardWrapper = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
`;

// PAGE BOX STYLED-COMPONENTS
export const PageBox = Box.extend`
  margin: 10px;
  max-width: 90%;
  max-height: 90%;
  width: 320px;
  height: 240px;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 0px 19px 3px rgba(126, 149, 168, 0.7);
  }
`;

export const BlankPageBox = PageBox.extend`
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`;

// PAGE CONTAINERS
export const PageTextContainer = styled.div`
  width: 100%;
  margin-left: 1em;
  margin-right: 1em;
  display: flex;
`;

export const PageInfoContainer = styled.div`
  width: 100%;
  height: 30px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const PageInfoItem = styled.a`
  text-decoration: none;
  color: grey;
  padding-bottom: 10px;
`;

// PAGE ITEMS
export const CreatePageIcon = styled.i`
  zoom: 4;
  color: lightgray;
  &:hover {
    color: gray;
  }
`;

export const PageImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 60%;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  object-fit: cover;
`;

export const PageName = styled.h1`
  width: 90%;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
