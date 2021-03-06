import React from "react";
import styled from "styled-components";

export const Snackbar = styled.div`
  opacity: ${props => (props.showSnackbar ? "1" : "0")};
  visibility: ${props => (props.showSnackbar ? "visible" : "hidden")};
  min-width: 250px;
  margin-left: -125px;
  background-color: gray;
  box-shadow: 10px 10px 15px lightgray;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 90%;
  transition: 0.2s;
`;
