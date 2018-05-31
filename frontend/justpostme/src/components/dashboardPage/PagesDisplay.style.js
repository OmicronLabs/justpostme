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

export const EmptyPagesDisplayWrapper = PagesDisplayWrapper.extend`
  height: 70%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const EmptyPagesHeader = styled.h1`
  font-size: 250%;
  max-width: 80%;
  color: lightgray;
`;

export const EmptyPagesText = styled.h4`
  text-align: center;
  font-size: 100%;
  width: 500px;
  max-width: 80%;
  color: lightgray;
`;
