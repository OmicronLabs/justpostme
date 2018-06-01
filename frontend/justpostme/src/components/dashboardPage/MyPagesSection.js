//@flow
import React from "react";
import styled from "styled-components";
import type { Card } from "../../components/dashboardPage/DashboardPageCard.js";
import { PagesDisplay } from "./PagesDisplay";
import { PagesDisplayWrapper } from "./PagesDisplay.style";
import Spinner from "../loadingSpinner/LoadingSpinner";

const SpinnerWrapper = PagesDisplayWrapper.extend`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  pages: Array<Card>,
  loading: boolean,
  error: boolean,
  userID: string,
  fetchManagedPages: Function,
  removeFromManaged: Function,
  removingPage: boolean
};

const myPagesEmptyHead = "No pages to manage";
const myPagesEmptyText =
  "Looks like you have not added any managed pages yet. Add pages by clicking the button below.";

class MyPagesSection extends React.Component<Props> {
  componentDidMount() {
    const { userID, fetchManagedPages } = this.props;
    fetchManagedPages(userID);
  }

  componentWillReceiveProps(nextState: Props) {
    const { removingPage, userID, fetchManagedPages } = this.props;
    const nextRemovingPage = nextState.removingPage;
    if (removingPage && !nextRemovingPage) {
      fetchManagedPages(userID);
    }
  }

  render() {
    const { loading, error } = this.props;
    return !loading ? (
      <PagesDisplay
        pages={this.props.pages}
        emptyHead={myPagesEmptyHead}
        emptyText={myPagesEmptyText}
        createCard={false}
        loading={loading}
        error={error}
        removeFromManaged={this.props.removeFromManaged}
      />
    ) : (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }
}

export default MyPagesSection;
