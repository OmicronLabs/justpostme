import React from "react";
import styled from "styled-components";

import SubmissionCardContainer from "../../containers/pageControl/SubmissionCardContainer";
import SubmissionCard from "../pageControl/SubmissionCard";
import { ErrorDisplay } from "../dashboardPage/PagesDisplay";

export const SubmissionsDisplayWrapper = styled.div`
  margin-top: 30px;
  width: 1024px;
  max-width: 85%;
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
  token: string,
  pageId: string
};

const noSubmissionsHead = "No pending posts";
const noSubmissionsText =
  "Looks like you have no pending submission yet. Make sure your users can see the submission link!";
const SubmissionDisplay = (props: Props) => {
  return props.submissions ? (
    <SubmissionsDisplayWrapper>
      <SubmissionsWrapper>
        {props.submissions.length < 1 ? (
          <ErrorDisplay
            head={noSubmissionsHead}
            text={noSubmissionsText}
            createCard={true}
          />
        ) : (
          props.submissions.map(post => (
            <SubmissionCard
              id={post.databaseId}
              text={post.name}
              token={props.token}
            />
          ))
        )}
      </SubmissionsWrapper>
    </SubmissionsDisplayWrapper>
  ) : null;
};

export default SubmissionDisplay;
