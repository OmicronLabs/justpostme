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
  justify-content: space-around;
  overflow: scroll;
`;

export const ErrorWrapper = PagesDisplayWrapper.extend`
  height: 70%;
  width: 100%;
  margin-top: 50px;

  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
