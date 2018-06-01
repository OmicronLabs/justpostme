import React from "react";
import styled from "styled-components";

import SubmissionCard from "./SubmissionCard";

export const SubmissionsDisplayWrapper = styled.div`
  margin-top: 30px;
  width: 1024px;
  margin-bottom: 90px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  overflow: scroll;
`;

type Props = {
  submssions: any
};

const SubmissionDisplay = (props: Props) => (
  <SubmissionsDisplayWrapper>
    {props.submssions.map(post => (
      <SubmissionCard id={post.id} text={post.text} />
    ))}
  </SubmissionsDisplayWrapper>
);

export default SubmissionDisplay;
