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
  fetchModerationSubmissions: Function,
  pageId: string,
  token: string,
  errorToFb: boolean,
  postingToFb: boolean
};

class ModerationSubmissions extends React.Component<Props> {
  componentDidMount() {
    const { pageId, fetchModerationSubmissions } = this.props;
    fetchModerationSubmissions(pageId);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { postingToFb, pageId, fetchModerationSubmissions } = this.props;
    const newPostingToFb = nextProps.postingToFb;

    const errorToFb = nextProps.errorToFb;

    if (postingToFb && !newPostingToFb && errorToFb) {
      fetchModerationSubmissions(pageId);
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
        errorHead="No posts awaiting moderation"
        errorText="You have not asked your users to moderate any posts."
        isPending
        isModeration
      />
    );
  }
}

export default ModerationSubmissions;
