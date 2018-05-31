import React from "react";
import styled from "styled-components";

export const ErrorHeader = styled.h1`
  font-size: 250%;
  max-width: 80%;
  color: lightgray;
`;

export const ErrorSubHeader = styled.h1`
  font-size: 200%;
  max-width: 80%;
  color: gray;
`;

export const ErrorText = styled.h4`
  text-align: center;
  font-size: 100%;
  width: 500px;
  max-width: 80%;
  color: lightgray;
`;

export const ErrorTextDark = ErrorText.extend`
  color: gray;
`;

export const ErrorLink = styled.a`
  font-size: 100%;
  color: rgb(156, 196, 90);
`;

export const ErrorTextLink = ErrorText.extend``;
