//@flow

import React from "react";
import styled from "styled-components";

import { serverDomain } from "../../const/serverURL";
import { postToFbInstant } from "../../actions/postSubmission";

const Wrapper = styled.div`
  height: 70px;
  width: 100%;
  border: 1px solid green;
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
  deletePendingSubmission: Function
};

const SubmissionId = styled.p`
  background: rgba(127, 255, 0, 0.1);
  width: 20%;
  max-width: 20%;
  text-align: center;
  line-height: 70px;
`;

const SubmissionBody = styled.p`
  width: 50%;
  max-width: 50%;
  align: center;
  text-align: center;
`;

const SubmissionControls = styled.div`
  width: 30%;
  max-width: 30%;
  height: 100%;
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
    deletePendingSubmission
  } = props;

  return (
    <Wrapper>
      <SubmissionId>{submission.id}</SubmissionId>
      <SubmissionBody>{submission.text}</SubmissionBody>
      <SubmissionControls>
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
