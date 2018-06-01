import React from "react";
import styled from "styled-components";

import SubmissionCard from "./SubmissionCard";

export const SubmissionsDisplayWrapper = styled.div`
  margin-top: 30px;
  width: 1024px;
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  overflow: scroll;
`;

export const SubmissionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  submissions: any,
  token: string
};

const SubmissionDisplay = (props: Props) => {
  return props.submissions ? (
    <SubmissionsDisplayWrapper>
      <SubmissionsWrapper>
        {props.submissions.map(post => (
          <SubmissionCard
            id={post.databaseId}
            text={post.name}
            token={props.token}
          />
        ))}
      </SubmissionsWrapper>
    </SubmissionsDisplayWrapper>
  ) : null;
};

export default SubmissionDisplay;
