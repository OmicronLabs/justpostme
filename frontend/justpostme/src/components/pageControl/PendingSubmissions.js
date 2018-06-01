import React from "react";
import styled from "styled-components";

import SubmissionDisplay from "./SubmissionsDisplay";
import Spinner from "../loadingSpinner/LoadingSpinner";
import { PagesDisplayWrapper } from "../dashboardPage/PagesDisplay.style";

const SpinnerWrapper = PagesDisplayWrapper.extend`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  submissions: Array<any>,
  loading: boolean,
  error: boolean,
  userID: string,
  fetchPendingSubmissions: Function,
  pageId: string,
  token: string
};

class PendingSubmissions extends React.Component<Props> {
  componentDidMount() {
    const { pageId, fetchPendingSubmissions } = this.props;
    fetchPendingSubmissions(pageId);
  }

  render() {
    const { loading, submissions, token } = this.props;
    return loading ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      <SubmissionDisplay submissions={submissions} token={token} />
    );
  }
}

export default PendingSubmissions;
