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
  width: 7%;
  max-width: 7%;
  border-right: 2px solid white;
`;

const PostContent = LegendItem.extend`
  width: 50%;
  max-width: 50%;
  border-right: 2px solid white;
`;

const TimeStamp = LegendItem.extend`
  width: 20%;
  max-width: 20%;
  border-right: 2px solid white;
`;

const PostControls = LegendItem.extend`
  width: 13%;
  max-width: 13%;
  border-right: 2px solid white;
`;

const PostWarning = LegendItem.extend`
  width: 10%;
  max-width: 10%;
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
          <TimeStamp>Submitted</TimeStamp>
          <PostControls>Post Controls</PostControls>
          <PostWarning>Warnings</PostWarning>
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
              submission={post}
              token={props.token}
              displayId={index + 1}
            />
          ))
        )}
      </SubmissionsWrapper>
    </SubmissionsDisplayWrapper>
  ) : null;
};

export default SubmissionDisplay;
