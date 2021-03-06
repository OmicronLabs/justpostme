import React from "react";
import styled from "styled-components";

export const PagesDisplayWrapper = styled.div`
  margin-top: 30px;
  width: 1024px;
  max-width: 85%;
  margin-bottom: 90px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  overflow: scroll;
`;

export const ErrorWrapper = PagesDisplayWrapper.extend`
  height: 70%;
  width: 100%;
  margin-top: 500px;
  user-select: none;
  justify-content: flex-start;
  align-content: center;
  flex-direction: column;
  align-items: center;
`;
