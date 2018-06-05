import styled from "styled-components";

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

export const PageOverviewWrapper = styled.div`
  margin-top: 2px;
  height: 60px;
  width: 1024px;
  max-width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const PageOverviewImage = styled.img`
  margin: 10px;
  border-radius: 10px;
  height: 100px;
  min-width: 100px;
  width: 100px;
  object-fit: cover;
  box-shadow: 0px 0px 4px 3px rgba(126, 149, 168, 0.5);
`;

export const PageOverviewText = styled.h1`
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: gray;
`;

export const ClickablePageOverviewText = PageOverviewText.extend`
  cursor: pointer;
  &:hover {
    color: rgba(76, 175, 80, 0.7);
  }
`;

export const Box = styled.div`
  box-shadow: 0px 0px 19px 3px rgba(126, 149, 168, 0.5);
  border-radius: 6px;
  background: white;
  display: flex;
`;
