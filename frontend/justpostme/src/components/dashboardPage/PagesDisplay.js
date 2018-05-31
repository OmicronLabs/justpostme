//@flow
import React from "react";
import styled from "styled-components";
import { LargeThemedButton } from "../common/Buttons";
import { GeneratedCard, AddPageCard } from "./DashboardPageCard";
import type { CardProps } from "./DashboardPageCard";
import {
  EmptyPagesDisplayWrapper,
  PagesDisplayWrapper,
  EmptyPagesHeader,
  EmptyPagesText
} from "./PagesDisplay.style";
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

export const EmptyPagesDisplay = (props: EmptyProps) => {
  if (props.createCard) {
    return (
      <EmptyPagesDisplayWrapper>
        <EmptyPagesHeader className="emptyHeader">
          {props.head}
        </EmptyPagesHeader>
        <EmptyPagesText className="emptyText">{props.text}</EmptyPagesText>
      </EmptyPagesDisplayWrapper>
    );
  } else {
    return (
      <EmptyPagesDisplayWrapper>
        <EmptyPagesHeader className="emptyHeader">
          {props.head}
        </EmptyPagesHeader>
        <EmptyPagesText className="emptyText">{props.text}</EmptyPagesText>
        <Link to="/pages/add">
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
    const components = props.pages.map((page, index) => {
      return <GeneratedCard card={page} key={index} />;
    });
    !props.createCard && components.push(<AddPageCard />);
    return <PagesDisplayWrapper>{components}</PagesDisplayWrapper>;
  }
};
