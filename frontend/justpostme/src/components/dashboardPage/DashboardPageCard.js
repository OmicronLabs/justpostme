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
  name: string,
  backgroundImgURL: string,
  pendingPosts: number,
  scheduledPosts: number
};

export const GeneratedCard = (props: CardProps) => {
  const { backgroundImgURL, name, pendingPosts, scheduledPosts } = props.card;
  return (
    <PageBox>
      <PageImage className="image" src={backgroundImgURL} />
      <PageTextContainer>
        <PageName className="name">{name}</PageName>
      </PageTextContainer>
      <PageInfoContainer>
        <PageInfoItem>{`pending: ${pendingPosts}`}</PageInfoItem>
        <PageInfoItem>{`scheduled: ${scheduledPosts}`}</PageInfoItem>
      </PageInfoContainer>
    </PageBox>
  );
};

export const AddPageCard = () => (
  <BlankPageBox>
    <IconButton>
      <CreatePageIcon className="fa fa-plus" />
    </IconButton>
  </BlankPageBox>
);
