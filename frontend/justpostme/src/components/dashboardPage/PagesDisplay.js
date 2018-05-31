//@flow
import React from "react";
import styled from "styled-components";
import { LargeThemedButton } from "../common/Buttons";
import { GeneratedCard, AddPageCard } from "./DashboardPageCard";
import type { CardProps } from "./DashboardPageCard";
import { ErrorWrapper, PagesDisplayWrapper } from "./PagesDisplay.style";

import { ErrorHeader, ErrorText } from "../common/ErrorText";
import { Link } from "react-router-dom";

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

export const ErrorDisplay = (props: EmptyProps) => {
  if (props.createCard) {
    return (
      <ErrorWrapper>
        <ErrorHeader className="emptyHeader">{props.head}</ErrorHeader>
        <ErrorText className="emptyText">{props.text}</ErrorText>
      </ErrorWrapper>
    );
  } else {
    return (
      <ErrorWrapper>
        <ErrorHeader className="emptyHeader">{props.head}</ErrorHeader>
        <ErrorText className="emptyText">{props.text}</ErrorText>
        <Link to="/pages/add">
          <LargeThemedButton>Add a managed page</LargeThemedButton>
        </Link>
      </ErrorWrapper>
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
    const components = props.pages.map(page => {
      return <GeneratedCard card={page} />;
    });
    !props.createCard && components.push(<AddPageCard />);
    return <PagesDisplayWrapper>{components}</PagesDisplayWrapper>;
  }
};
