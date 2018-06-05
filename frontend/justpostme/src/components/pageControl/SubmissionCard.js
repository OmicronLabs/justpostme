import React from "react";
import styled from "styled-components";

import { serverDomain } from "../../const/serverURL";

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
  pageID: string
};

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

const SubmissionCard = (props: Props) => {
  const url = `${serverDomain}/backend/postit?postid=${props.id}&pageid=${
    props.pageId
  }`;
  return (
    <Wrapper>
      <p>{props.id}</p>
      <p>{props.text}</p>
      <button onClick={() => postStuff(url)}>Click me to post!!! </button>
    </Wrapper>
  );
};

export default SubmissionCard;
