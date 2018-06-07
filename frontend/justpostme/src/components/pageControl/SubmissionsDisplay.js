import React from "react";
import styled from "styled-components";

import SubmissionCardContainer from "../../containers/pageControl/SubmissionCardContainer";
import { ErrorDisplay } from "../dashboardPage/PagesDisplay";

export const SubmissionsDisplayWrapper = styled.div`
  width: 1024px;
  max-width: 85%;
  margin-bottom: 70px;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  display: flex;
`;

export const SubmissionsWrapper = styled.div`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
  padding-bottom: 20px;
`;

const SubmissionsLegend = styled.div`
  display: flex;
  line-height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  vertical-align: center;
  height: 50px;
  background: rgb(141, 195, 78);
`;

const LegendItem = styled.p`
  color: white;
  align: center;
  height: 100%;
  text-align: center;
`;

const PostId = LegendItem.extend`
  width: 20%;
  max-width: 20%;
`;

const PostContent = LegendItem.extend`
  width: 50%;
  max-width: 50%;
`;

const PostControls = LegendItem.extend`
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
          <PostId>Index</PostId>
          <PostContent>Body</PostContent>
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
          props.submissions.map((post, index) => (
            <SubmissionCardContainer
              pageId={props.pageId}
              submission={{ id: post.databaseId, text: post.name }}
              token={props.token}
              displayId={index}
            />
          ))
        )}
      </SubmissionsWrapper>
    </SubmissionsDisplayWrapper>
  ) : null;
};

export default SubmissionDisplay;
