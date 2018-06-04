//@flow

import React from "react";
import styled from "styled-components";
import { PagesDisplay } from "./PagesDisplay";
import type { CardProps } from "./DashboardPageCard";
import { PagesDisplayWrapper } from "./PagesDisplay.style";
import Spinner from "../loadingSpinner/LoadingSpinner";

type Props = {
  pages: Array<CardProps>,
  loading: boolean,
  error: string,
  userID: string,
  addPageToManaged: Function,
  fetchUnmanagedPages: Function,
  addingPage: boolean
};

const SpinnerWrapper = PagesDisplayWrapper.extend`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const addPagesEmptyHead = "No unmanaged pages";
const addPagesEmptyText =
  "Looks like you are not an administrator of any pages. To start create a Facebook page.";

class AddPagesSection extends React.Component<Props> {
  componentDidMount() {
    const { userID, fetchUnmanagedPages } = this.props;
    fetchUnmanagedPages(userID);
  }

  render() {
    const { loading, addingPage } = this.props;
    return !loading ? (
      <PagesDisplay
        loading={addingPage}
        pages={this.props.pages}
        addPageToManaged={this.props.addPageToManaged}
        emptyHead={addPagesEmptyHead}
        emptyText={addPagesEmptyText}
        createCard={true}
      />
    ) : (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }
}

export default AddPagesSection;
