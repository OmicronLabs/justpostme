import styled from "styled-components";

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
  border: 0px;
  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }
`;

export const IconButton = styled.a`
  text-decoration: none;
  color: grey;
  padding-bottom: 10px;
  &:hover {
    color: darkgray;
  }
`;

export const LargeThemedButton = RoundButton.extend`
  color: rgb(255, 87, 34);
  font-size: 1.3em;
  border-color: rgb(255, 87, 34);
  &:hover {
    color: rgba(255, 87, 34, 0.7);
    border: 2px solid rgba(255, 87, 34, 0.7);
    cursor: pointer;
  }
`;
