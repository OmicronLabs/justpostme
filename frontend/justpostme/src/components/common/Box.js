import React from "react";
import styled, { CSS } from "styled-components";

export const BoxWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  padding-top: 3em;
  padding-bottom: 3em;
  margin-bottom: 12em;
  max-width: 800px;
  box-shadow: 0px 0px 19px 3px rgba(126, 149, 168, 0.5);
  border-radius: 6px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
