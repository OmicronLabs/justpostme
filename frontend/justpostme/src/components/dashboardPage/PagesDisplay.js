//@flow
import React from "react";
import styled from "styled-components";
import { LargeThemedButton } from "../common/Buttons";
import { GeneratedCard, AddPageCard } from "./DashboardPageCard";
import type { CardProps } from "./DashboardPageCard";
import { Link } from "react-router-dom";

type Props = {
  pages: Array<CardProps>
};

const PagesDisplayWrapper = styled.div`
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

const EmptyPagesDisplayWrapper = PagesDisplayWrapper.extend`
  height: 70%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const EmptyPagesHeader = styled.h1`
  font-size: 250%;
  max-width: 80%;
  color: lightgray;
`;

const EmptyPagesText = styled.h4`
  font-size: 100%;
  width: 500px;
  max-width: 80%;
  color: lightgray;
`;

export const EmptyPagesDisplay = () => (
  <EmptyPagesDisplayWrapper>
    <EmptyPagesHeader>No pages to manage</EmptyPagesHeader>
    <EmptyPagesText>
      Looks like you have not added any managed pages yet. Add pages by clicking
      the button below.
    </EmptyPagesText>
    <Link to="/dashboard/add">
      <LargeThemedButton>Add a managed page</LargeThemedButton>
    </Link>
  </EmptyPagesDisplayWrapper>
);

export function PagesDisplay(props: Props) {
  if (props.pages.length < 1) {
    return <EmptyPagesDisplay />;
  } else {
    return (
      <PagesDisplayWrapper>
        {props.pages.map(page => {
          return <GeneratedCard card={page} />;
        })}
        <AddPageCard />
      </PagesDisplayWrapper>
    );
  }
}
