//@flow
import React from "react";
import styled from "styled-components";
import { LargeThemedButton } from "../common/Buttons";
import { GeneratedCard, AddPageCard } from "./DashboardPageCard";
import type { CardProps } from "./DashboardPageCard";
import { Link } from "react-router-dom";

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
  text-align: center;
  font-size: 100%;
  width: 500px;
  max-width: 80%;
  color: lightgray;
`;

type Props = {
  pages: Array<CardProps>,
  emptyHead: string,
  emptyText: string,
  createCard: boolean
};

type EmptyProps = {
  head: string,
  text: string,
  createCard: boolean
};

export const EmptyPagesDisplay = (props: EmptyProps) => {
  if (props.createCard) {
    return (
      <EmptyPagesDisplayWrapper>
        <EmptyPagesHeader>{props.head}</EmptyPagesHeader>
        <EmptyPagesText>{props.text}</EmptyPagesText>
      </EmptyPagesDisplayWrapper>
    );
  } else {
    return (
      <EmptyPagesDisplayWrapper>
        <EmptyPagesHeader>{props.head}</EmptyPagesHeader>
        <EmptyPagesText>{props.text}</EmptyPagesText>
        <Link to="/dashboard/add">
          <LargeThemedButton>Add a managed page</LargeThemedButton>
        </Link>
      </EmptyPagesDisplayWrapper>
    );
  }
};

export const PagesDisplay = (props: Props) => {
  if (!props.pages || props.pages.length < 1) {
    return (
      <EmptyPagesDisplay
        head={props.emptyHead}
        text={props.emptyText}
        createCard={props.createCard}
      />
    );
  } else {
    const components = props.pages.map(page => {
      return <GeneratedCard card={page} />;
    });
    !props.createCard && components.push(<AddPageCard />);
    return <PagesDisplayWrapper>{components}</PagesDisplayWrapper>;
  }
};
