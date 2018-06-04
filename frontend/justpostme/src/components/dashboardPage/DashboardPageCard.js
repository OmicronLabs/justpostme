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

export type Props = {
  card: Card,
  addPageToManaged: Function,
  removePageFromManaged: Function,
  history: any,
  loading: boolean,
  error: boolean
};

export type Card = {
  name: string,
  backgroundImgURL: string,
  pendingPosts: number,
  scheduledPosts: number,
  pageID: string
};

class GeneratedCardSimple extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    const { pageID } = this.props.card;
    const { loading, addPageToManaged } = this.props;
    const nextLoading = nextProps.loading;
    const error = nextProps.error;
    if (addPageToManaged && loading && !nextLoading && !error) {
      this.props.history.push(`/page/${pageID}`);
    }
  }

  render() {
    const {
      backgroundImgURL,
      name,
      pendingPosts,
      scheduledPosts,
      pageID
    } = this.props.card;
    const { addPageToManaged, removePageFromManaged } = this.props;
    return (
      <PageBox
        onClick={() => {
          this.props.addPageToManaged
            ? this.props.addPageToManaged(pageID)
            : this.props.history.push(`/page/${pageID}`);
        }}
      >
        <PageImage className="image" src={backgroundImgURL} />
        <PageTextContainer>
          <PageName className="name">{name}</PageName>
        </PageTextContainer>

        <PageInfoContainer>
          <PageInfoItem>{`pending: ${pendingPosts}`}</PageInfoItem>
          <PageInfoItem>{`scheduled: ${scheduledPosts}`}</PageInfoItem>
          {removePageFromManaged ? (
            <IconButton
              style={{ background: "red" }}
              onClick={e => {
                if (!e) var e = window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
                removePageFromManaged(pageID);
              }}
            >
              Remove
            </IconButton>
          ) : null}
        </PageInfoContainer>
      </PageBox>
    );
  }
}

export const GeneratedCard = withRouter(GeneratedCardSimple);

export const AddPageCard = () => (
  <BlankPageBox>
    <IconButton>
      <CreatePageIcon className="fa fa-plus" />
    </IconButton>
  </BlankPageBox>
);
