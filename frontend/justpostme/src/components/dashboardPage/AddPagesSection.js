//@flow

import React from "react";
import styled from "styled-components";
import { PagesDisplay } from "./PagesDisplay";
import type { CardProps } from "./DashboardPageCard";
import { fetchUnmanagedPages } from "../../actions/unmanagedPages";
import { PagesDisplayWrapper } from "./PagesDisplay.style";
import Spinner from "../loadingSpinner/LoadingSpinner";

type Props = {
  pages: Array<CardProps>,
  loading: boolean,
  error: string
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
    this.props.dispatch(fetchUnmanagedPages());
  }

  render() {
    const { loading } = this.props;
    return loading ? (
      <PagesDisplay
        pages={this.props.pages}
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
