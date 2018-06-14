import React from "react";
import styled from "styled-components";

import SubmissionCardContainer from "../../containers/pageControl/SubmissionCardContainer";
import { ErrorDisplay } from "../dashboardPage/PagesDisplay";
import { removeSubmission } from "../../actions/removeSubmission";

export const SubmissionsDisplayWrapper = styled.div`
  width: 1024px;
  max-width: 100%;
  margin-bottom: 70px;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  display: flex;
  overflow: scroll;
`;

export const SubmissionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
  padding-bottom: 20px;
`;

const SubmissionsLegend = styled.div`
  display: flex;
  line-height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  vertical-align: center;
  height: 50px;
  background: rgb(141, 195, 78);
`;

const LegendItem = styled.p`
  color: white;
  align: center;
  height: 100%;
  text-align: center;
`;

const PostId = LegendItem.extend`
  width: 7%;
  max-width: 7%;
  border-right: 2px solid white;
`;

const PostContent = LegendItem.extend`
  width: 50%;
  max-width: 50%;
  border-right: 2px solid white;
`;

const TimeStamp = LegendItem.extend`
  width: 20%;
  max-width: 20%;
  border-right: 2px solid white;
`;

const PostControls = LegendItem.extend`
  width: 13%;
  max-width: 13%;
  border-right: 2px solid white;
`;

const TimeStampScheduled = TimeStamp.extend`
  width: 33%;
  max-width: 33%;
`;

const PostWarning = LegendItem.extend`
  width: 10%;
  max-width: 10%;
`;

type Props = {
  submissions: any,
  token: string,
  pageId: string,
  errorHead: string,
  errorText: string,
  isPending: boolean,
  removeSubmission: Function,
  removeLoading: boolean,
  removeError: boolean,
  postingToFb: boolean,
  errorToFb: boolean,
  schedulingToFb: boolean,
  errorSchedulingToFb: boolean,
  snackbarNotify: Function
};

class SubmissionDisplay extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    const {
      submissions,
      token,
      pageId,
      errorHead,
      errorText,
      isPending,
      removeSubmission,
      removeLoading,
      removeError,
      postingToFb,
      errorToFb,
      schedulingToFb,
      errorSchedulingToFb,
      snackbarNotify
    } = this.props;

    if (
      schedulingToFb &&
      !nextProps.schedulingToFb &&
      !nextProps.errorSchedulingToFb
    ) {
      snackbarNotify("The post has been scheduled");
    }

    if (postingToFb && !nextProps.errorToFb && !nextProps.postingToFb) {
      snackbarNotify("Posted to Facebook");
    }

    if (removeLoading && !nextProps.removeLoading && !nextProps.removeError) {
      snackbarNotify("The post has been removed");
    }
  }

  render() {
    const {
      submissions,
      token,
      pageId,
      errorHead,
      errorText,
      isPending,
      removeSubmission,
      removeLoading,
      removeError,
      postingToFb,
      errorToFb,
      schedulingToFb,
      errorSchedulingToFb,
      snackbarNotify
    } = this.props;

    return submissions ? (
      <SubmissionsDisplayWrapper>
        {submissions.length < 1 ? null : isPending ? (
          <SubmissionsLegend>
            <PostId>Index</PostId>
            <PostContent>Body</PostContent>
            <TimeStamp>Submitted</TimeStamp>
            <PostControls>Post Controls</PostControls>
            <PostWarning>Warnings</PostWarning>
          </SubmissionsLegend>
        ) : (
          <SubmissionsLegend>
            <PostId>Index</PostId>
            <PostContent>Body</PostContent>
            <TimeStampScheduled>Scheduled for</TimeStampScheduled>
            <PostWarning>Warnings</PostWarning>
          </SubmissionsLegend>
        )}

        <SubmissionsWrapper>
          {submissions.length < 1 ? (
            <ErrorDisplay head={errorHead} text={errorText} createCard={true} />
          ) : (
            submissions.map((post, index) => (
              <SubmissionCardContainer
                pageId={pageId}
                submission={post}
                token={token}
                displayId={index + 1}
                isPending={isPending}
              />
            ))
          )}
        </SubmissionsWrapper>
      </SubmissionsDisplayWrapper>
    ) : null;
  }
}

export default SubmissionDisplay;
