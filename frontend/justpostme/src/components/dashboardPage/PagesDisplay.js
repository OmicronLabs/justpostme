import React from "react";
import styled from "styled-components";

type Props = {
  pages: Array<any>
};

const PagesDisplayWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`;

const PagesDisplay = (props: Props) => (
  //<PagesDisplayWrapper>{props.pages.map(page => page)}</PagesDisplayWrapper>
);
