//@flow

import React from "react";
import styled from "styled-components";
import { IconButton } from "../common/Buttons";
import { withRouter } from "react-router-dom";
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
  scheduledPosts: number,
  pageID: string
};

const GeneratedCardSimple = (props: CardProps) => {
  const {
    backgroundImgURL,
    name,
    pendingPosts,
    scheduledPosts,
    pageID
  } = props.card;
  return (
    <PageBox onClick={() => props.history.push(`/page/34324`)}>
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

export const GeneratedCard = withRouter(GeneratedCardSimple);

export const AddPageCard = () => (
  <BlankPageBox>
    <IconButton>
      <CreatePageIcon className="fa fa-plus" />
    </IconButton>
  </BlankPageBox>
);
