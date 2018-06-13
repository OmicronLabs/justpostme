import React from "react";
import styled from "styled-components";

import SubmissionDisplay from "./SubmissionsDisplay";
import Spinner from "../loadingSpinner/LoadingSpinner";
import { PagesDisplayWrapper } from "../dashboardPage/PagesDisplay.style";

const SpinnerWrapper = PagesDisplayWrapper.extend`
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
  token: string,
  errorToFb: boolean,
  postingToFb: boolean
};

class PendingSubmissions extends React.Component<Props> {
  componentDidMount() {
    const { pageId, fetchPendingSubmissions } = this.props;
    fetchPendingSubmissions(pageId);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { postingToFb, pageId, fetchPendingSubmissions } = this.props;
    const newPostingToFb = nextProps.postingToFb;

    const errorToFb = nextProps.errorToFb;

    if (postingToFb && !newPostingToFb && errorToFb) {
      fetchPendingSubmissions(pageId);
    }
  }

  render() {
    const { loading, submissions, accessToken, pageId } = this.props;
    return loading ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      <div>
        <SubmissionDisplay
          submissions={submissions}
          token={accessToken}
          pageId={pageId}
          errorHead="No pending posts"
          errorText="Looks like you have no pending submission yet. Make sure your users can see the submission link!"
          isPending={true}
        />
      </div>
    );
  }
}

export default PendingSubmissions;
