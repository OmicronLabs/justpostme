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
  align-content: center;
  padding-bottom: 10px;
  color: grey;
  &:hover {
    color: darkgray;
  }
`;

export const DropdownButton = RoundButton.extend`
  border: 0px;
  margin: 0em;
  color: gray;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  border-radius: 0px;
  &:hover {
    color: black;
    background: whitesmoke;
    border-radius: 3px;
  }
`;

export const LargeThemedButton = RoundButton.extend`
  color: rgb(76, 175, 80);
  font-size: 1.3em;
  border-color: rgb(76, 175, 80);
  &:hover {
    color: rgba(76, 175, 80, 0.7);
    border: 2px solid rgba(76, 175, 80, 0.7);
    cursor: pointer;
  }
`;
