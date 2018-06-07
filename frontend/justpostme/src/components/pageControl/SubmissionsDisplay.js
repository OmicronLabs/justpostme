import React from "react";
import styled from "styled-components";

import SubmissionCardContainer from "../../containers/pageControl/SubmissionCardContainer";
import { ErrorDisplay } from "../dashboardPage/PagesDisplay";

export const SubmissionsDisplayWrapper = styled.div`
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

const SubmissionsLegend = styled.div`
  display: flex;
  line-height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  vertical-align: center;
  height: 50px;
`;

const LegendItem = styled.p`
  color: gray;
  align: center;
  height: 100%;
  text-align: center;
`;

const PostId = LegendItem.extend`
  background: rgba(127, 255, 0, 0.1);
  width: 20%;
  max-width: 20%;
`;

const PostContent = LegendItem.extend`
  width: 50%;
  max-width: 50%;
`;

const PostControls = LegendItem.extend`
  background: rgba(127, 255, 0, 0.1);
  width: 30%;
  max-width: 30%;
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
      {props.submissions.length < 1 ? null : (
        <SubmissionsLegend>
          <PostId>Post ID</PostId>
          <PostContent>Content</PostContent>
          <PostControls>Post Controls</PostControls>
        </SubmissionsLegend>
      )}

      <SubmissionsWrapper>
        {props.submissions.length < 1 ? (
          <ErrorDisplay
            head={noSubmissionsHead}
            text={noSubmissionsText}
            createCard={true}
          />
        ) : (
          props.submissions.map(post => (
            <SubmissionCardContainer
              pageId={props.pageId}
              submission={{ id: post.databaseId, text: post.name }}
              token={props.token}
            />
          ))
        )}
      </SubmissionsWrapper>
    </SubmissionsDisplayWrapper>
  ) : null;
};

export default SubmissionDisplay;
