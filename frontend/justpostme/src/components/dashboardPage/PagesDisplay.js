//@flow
import React from "react";
import styled from "styled-components";
import { LargeThemedButton } from "../common/Buttons";
import { GeneratedCard, AddPageCard } from "./DashboardPageCard";
import type { CardProps } from "./DashboardPageCard";
import { PagesDisplayWrapper } from "./PagesDisplay.style";

import { ErrorHeader, ErrorText } from "../common/ErrorText";
import { Link } from "react-router-dom";
import { fetchCurrentPage } from "../../actions/currentPage";

type Props = {
  pages: Array<CardProps>,
  addPageToManaged: Function,
  removeFromManaged: Function,
  emptyHead: string,
  emptyText: string,
  createCard: boolean,
  loading: boolean,
  error: boolean
};

const ErrContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

type EmptyProps = {
  head: string,
  text: string,
  createCard: boolean
};

export const ErrorDisplay = (props: EmptyProps) => {
  if (props.createCard) {
    return (
      <ErrContainer>
        <ErrorHeader className="emptyHeader">{props.head}</ErrorHeader>
        <ErrorText className="emptyText">{props.text}</ErrorText>
      </ErrContainer>
    );
  } else {
    return (
      <ErrContainer>
        <ErrorHeader className="emptyHeader">{props.head}</ErrorHeader>
        <ErrorText className="emptyText">{props.text}</ErrorText>
        <Link to="/pages/add">
          <LargeThemedButton>Add a managed page</LargeThemedButton>
        </Link>
      </ErrContainer>
    );
  }
};

export const PagesDisplay = (props: Props) => {
  if (!props.pages || props.pages.length < 1) {
    return (
      <ErrorDisplay
        head={props.emptyHead}
        text={props.emptyText}
        createCard={props.createCard}
      />
    );
  } else {
    const components = props.pages.map((page, index) => {
      return (
        <GeneratedCard
          card={page}
          key={index}
          addPageToManaged={props.addPageToManaged}
          removePageFromManaged={props.removeFromManaged}
          loading={props.loading}
          error={props.error}
        />
      );
    });
    !props.createCard && components.push(<AddPageCard />);
    return <PagesDisplayWrapper>{components}</PagesDisplayWrapper>;
  }
};
