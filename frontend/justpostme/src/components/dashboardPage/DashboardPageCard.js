//@flow

import React from "react";
import styled from "styled-components";
import { IconButton } from "../common/Buttons";
import {
  PageBox,
  PageImage,
  PageTextContainer,
  PageInfoContainer,
  PageName,
  PageInfoItem,
  BlankPageBox,
  CreatePageIcon
} from "./DashboardPageCard.style";

export type CardProps = {
  card: Card
};

export type Card = {
  pageName: string,
  backgroundImage: string,
  scheduled: number,
  pending: number
};

export const GeneratedCard = (props: CardProps) => (
  <PageBox>
    <PageImage className="image" src={props.card.backgroundImage} />
    <PageTextContainer>
      <PageName className="name">{props.card.pageName}</PageName>
    </PageTextContainer>
    <PageInfoContainer>
      <PageInfoItem>pending: x</PageInfoItem>
      <PageInfoItem>scheduled: x</PageInfoItem>
    </PageInfoContainer>
  </PageBox>
);

export const AddPageCard = () => (
  <BlankPageBox>
    <IconButton>
      <CreatePageIcon className="fa fa-plus" />
    </IconButton>
  </BlankPageBox>
);
