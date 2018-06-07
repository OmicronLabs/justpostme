//@flow

import React from "react";
import styled from "styled-components";

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
  displayId: string
};

const SubmissionId = styled.p`
  width: 20%;
  max-width: 20%;
  text-align: center;
  line-height: 50px;
  margin: 0;
  padding: 0;
`;

const SubmissionBody = styled.p`
  width: 50%;
  max-width: 50%;
  height: 50px;
  align: center;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const SubmissionControls = styled.div`
  width: 30%;
  max-width: 30%;
  height: 50px;
  background: rgba(127, 255, 0, 0.1);
  align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const SubmissionCard = (props: Props) => {
  const {
    postToFbInstant,
    submission,
    pageId,
    deletePendingSubmission,
    displayId
  } = props;

  const isGreen = displayId % 2 === 1;
  const rowStyle = isGreen
    ? { background: "rgba(127, 255, 0, 0.1)" }
    : { background: "white" };

  return (
    <Wrapper>
      <SubmissionId style={rowStyle}>{displayId}</SubmissionId>
      <SubmissionBody style={rowStyle}>{submission.text}</SubmissionBody>
      <SubmissionControls style={rowStyle}>
        <button
          onClick={() => {
            postToFbInstant(submission.id, pageId);
            deletePendingSubmission(submission.id);
          }}
        >
          Click me to post!!!
        </button>
      </SubmissionControls>
    </Wrapper>
  );
};

export default SubmissionCard;
