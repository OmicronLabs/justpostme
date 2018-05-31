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
  margin-top: 0px;
  height: 140px;
  width: 964px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const PageOverviewImage = styled.img`
  margin: 20px;
  border-radius: 10px;
  height: 100px;
  min-width: 100px;
  width: 100px;
  object-fit: cover;
  box-shadow: 0px 0px 19px 3px rgba(126, 149, 168, 0.5);
`;

export const PageOverviewText = styled.h1`
  margin: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: gray;
`;

export const Box = styled.div`
  box-shadow: 0px 0px 19px 3px rgba(126, 149, 168, 0.5);
  border-radius: 6px;
  background: white;
  display: flex;
`;
