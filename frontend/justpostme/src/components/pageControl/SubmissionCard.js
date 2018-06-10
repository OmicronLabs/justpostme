//@flow

import React from "react";
import styled from "styled-components";
import "font-awesome/css/font-awesome.min.css";

import { serverDomain } from "../../const/serverURL";
import { postToFbInstant } from "../../actions/postSubmission";

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

type Submission = {
  id: string,
  text: string
};

type Props = {
  submission: Submission,
  userToken: string,
  pageId: string,
  postToFbInstant: Function,
  deletePendingSubmission: Function,
  displayId: string,
  match: any
};

const SubmissionId = styled.p`
  width: 7%;
  max-width: 7%;
  text-align: center;
  line-height: 50px;
  margin: 0;
  padding: 0;
`;

const SubmissionBody = styled.p`
  width: 50%;
  max-width: 50%;
  height: 50px;
  text-align: left;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 50px;
  padding-left: 12px;
`;

const SubmissionControls = styled.div`
  width: 33%;
  max-width: 33%;
  height: 50px;
  background: rgba(127, 255, 0, 0.1);
  align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const SubmissionWarnings = styled.div`
  width: 10%;
  max-width: 10%;
  height: 50px;
  background: rgba(127, 255, 0, 0.1);
  align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

const displayWarning = submission => {
  return submission.pii || submission.review;
};

const Warning = styled.i`
  color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const WarningOK = Warning.extend`
  color: green;
`;

const WarningComponent = () => (
  <Warning onHover={() => {}}>
    <i className="fa fa-exclamation-triangle" />
  </Warning>
);

const NoWarningComponent = () => (
  <WarningOK onHover={() => {}}>
    <i className="fa fa-check-circle" />
  </WarningOK>
);

const SubmissionCard = (props: Props) => {
  const {
    postToFbInstant,
    submission,
    pageId,
    deletePendingSubmission,
    displayId,
    history
  } = props;

  const isGreen = displayId % 2 === 1;
  const rowStyle = isGreen
    ? { background: "rgba(140, 195, 78, 0.12)" }
    : { background: "white" };

  return (
    <Wrapper>
      <SubmissionId style={rowStyle}>{displayId}</SubmissionId>
      <SubmissionBody
        style={rowStyle}
        onClick={() => {
          history.push(`/page/${pageId}/submission/${submission.postHash}`);
        }}
      >
        {submission.postText}
      </SubmissionBody>
      <SubmissionControls style={rowStyle}>
        <button
          onClick={() => {
            postToFbInstant(submission.databaseId, pageId);
            deletePendingSubmission(submission.databaseId);
          }}
        >
          Publish now
        </button>
        <button
          onClick={() => {
            postToFbInstant(submission.databaseId, pageId);
            deletePendingSubmission(submission.databaseId);
          }}
        >
          Schedule
        </button>
      </SubmissionControls>
      <SubmissionWarnings style={rowStyle}>
        {displayWarning(submission) ? (
          <WarningComponent />
        ) : (
          <NoWarningComponent />
        )}
      </SubmissionWarnings>
    </Wrapper>
  );
};

export default SubmissionCard;
