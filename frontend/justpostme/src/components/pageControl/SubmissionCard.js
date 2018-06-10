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
  cursor: pointer;
  background: ${props =>
    props.isGreen === true ? "rgba(140, 195, 78, 0.12)" : "white"};
  &:hover {
    background: rgba(140, 195, 78, 0.5);
  }
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
  width: 13%;
  max-width: 13%;
  height: 50px;
  align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Timestamp = styled.div`
  width: 20%;
  max-width: 20%;
  height: 50px;
  align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SubmissionWarnings = styled.div`
  width: 10%;
  max-width: 10%;
  height: 50px;
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

const DeleteContainer = Warning.extend`
  font-size: 22px;
  color: silver;
  &:hover {
    color: red;
  }
`;

const PublishContainer = Warning.extend`
  font-size: 22px;
  color: silver;
  &:hover {
    color: green;
  }
`;

const ControlButton = styled.div`
  background: silver;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    background: green;
  }
`;

const ControlButtonText = styled.a`
  margin: 4px 6px;
`;

const WarningComponent = () => (
  <Warning title="Post may contain sensitive content">
    <i className="fa fa-exclamation-triangle" />
  </Warning>
);

const NoWarningComponent = () => (
  <WarningOK title="Post passed automated checks, no sensitive content">
    <i className="fa fa-check-circle" />
  </WarningOK>
);

const DeleteComponent = props => (
  <DeleteContainer title="Delete" onClick={() => props.delete()}>
    <i className="fa fa-trash" />
  </DeleteContainer>
);

const PublishNowComponent = props => (
  <PublishContainer title="Publish now" onClick={() => props.publishNow()}>
    <i className="fa fa-paper-plane" />
  </PublishContainer>
);

const ScheduleComponent = props => (
  <PublishContainer
    title="Schedule for publication"
    onClick={() => props.schedule()}
  >
    <i className="fa fa-clock-o" />
  </PublishContainer>
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

  return (
    <Wrapper isGreen={isGreen}>
      <SubmissionId>{displayId}</SubmissionId>
      <SubmissionBody
        onClick={() => {
          history.push(`/page/${pageId}/submission/${submission.postHash}`);
        }}
      >
        {submission.postText}
      </SubmissionBody>
      <Timestamp> {submission.timePosted} </Timestamp>
      <SubmissionControls>
        <PublishNowComponent
          publishNow={() => {
            postToFbInstant(submission.databaseId, pageId);
            deletePendingSubmission(submission.databaseId);
          }}
        />
        <ScheduleComponent
          schedule={() => {
            deletePendingSubmission(submission.databaseId);
          }}
        />

        <DeleteComponent
          delete={() => {
            deletePendingSubmission(submission.databaseId);
          }}
        />
      </SubmissionControls>
      <SubmissionWarnings>
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
