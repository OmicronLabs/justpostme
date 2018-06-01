import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 70px;
  width: 100%;
  border: 1px solid green;
`;

type Submission = {
  id: string,
  text: string
};

type Props = {
  submission: Submission,
  userToken: string
};

const SubmissionCard = (props: Props) => (
  <Wrapper>
    <p>{props.id}</p>
    <p>{props.text}</p>
    <button>Click me to post!!! </button>
  </Wrapper>
);

export default SubmissionCard;
