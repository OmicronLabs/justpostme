import React from "react";
import styled, { CSS } from "styled-components";

export const RoundButton = styled.a`
  text-decoration: none;
  display: inline-block;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 30px;
`;

export const TopMenuButton = RoundButton.extend`
  color: white;
  border-color: white;
  &:hover {
    color: whitesmoke;
    border: 2px solid whitesmoke;
  }
`;
