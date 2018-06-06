//@flow

import React from "react";
import styled from "styled-components";

import { serverDomain } from "../../const/serverURL";
import { postToFbInstant } from "../../actions/postSubmission";

const Wrapper = styled.div`
  height: 70px;
  max-width: 100%;
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

const SubmissionCard = (props: Props) => {
  const {
    postToFbInstant,
    submission,
    pageId,
    deletePendingSubmission
  } = props;

const postStuff = url => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      console.log("success");
      return true;
    })
    .catch(error => console.log(error));
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

  return (
    <Wrapper>
      <p>{submission.id}</p>
      <p>{submission.text}</p>
      <button
        onClick={() => {
          postToFbInstant(submission.id, pageId);
          deletePendingSubmission(submission.id);
        }}
      >
        Click me to post!!!
      </button>
    </Wrapper>
  );
};

export default SubmissionCard;
