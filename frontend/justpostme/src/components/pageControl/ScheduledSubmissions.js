import React from "react";
import styled from "styled-components";

import SubmissionDisplay from "../../containers/pageControl/SubmissionsDisplayContainer";

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
  fetchScheduledSubmissions: Function,
  pageId: string,
  token: string,
  errorToFb: boolean,
  postingToFb: boolean
};

class ScheduledSubmissions extends React.Component<Props> {
  componentDidMount() {
    const { pageId, fetchScheduledSubmissions } = this.props;
    fetchScheduledSubmissions(pageId);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { postingToFb, pageId, fetchScheduledSubmissions } = this.props;
    const newPostingToFb = nextProps.postingToFb;

    const errorToFb = nextProps.errorToFb;

    if (postingToFb && !newPostingToFb && errorToFb) {
      fetchScheduledSubmissions(pageId);
    }
  }

  render() {
    const { loading, submissions, accessToken, pageId } = this.props;
    return loading ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      <SubmissionDisplay
        submissions={submissions}
        token={accessToken}
        pageId={pageId}
        errorHead="No scheduled posts"
        errorText="You have not scheduled any posts yet."
      />
    );
  }
}

export default ScheduledSubmissions;
