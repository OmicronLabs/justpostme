//@flow

import React from "react";
import { Box, BoxWrapper } from "../common/Box";
import styled from "styled-components";
import "font-awesome/css/font-awesome.min.css";
import { RoundButton } from "../common/Buttons";
import Comments from "../common/Comments";

const CommentsContainer = styled.div`
  display: flex;
  box-shadow: inset 0 0 10px whitesmoke;
  border: 1px solid lightgray;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 0px;
  border-radius: 6px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: rgb(76, 175, 80);
`;

const PageInfoWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const PageFooter = styled.div`
  width: 100%;
  border-top: 2px solid lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const ContentWrapper = styled.div`
  width: 85%;
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: rgb(76, 175, 80);
  margin: 10px 0;
`;

const InputField = styled.textarea`
  width: 100%;
  padding: 5px;
  outline: none;
  box-shadow: inset 0 0 10px whitesmoke;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 6px;
  background: whitesmoke;
  &:focus {
    background: white;
  }
`;

const DisplaySubmission = styled.div`
  box-shadow: inset 0 0 10px whitesmoke;
  border: 1px solid lightgray;
  border-radius: 6px;
  min-height: 80px;
  width: 100%;
  overflow: scroll;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
`;

const ButtonText = styled.div`
  margin: 5px 10px;
`;

const Button = RoundButton.extend`
  margin: 5px;
  margin-top: 1em;
  border-radius: 6px;
  padding: 0px;
  color: ${props =>
    props.alert ? "red" : props.warning ? "orange" : "rgb(76,175, 80)"};
  border: ${props =>
    props.alert
      ? "1px solid red"
      : props.warning
        ? "1px solid orange"
        : "1px solid rgb(76,175, 80)"};
  &:hover {
    box-shadow: inset 0 0 10px whitesmoke;
    color: ${props =>
      props.alert ? "darkred" : props.warning ? "darkorange" : "green"};
    border: ${props =>
      props.alert
        ? "1px solid darkred"
        : props.warning
          ? "1px solid darkorange"
          : "1px solid green"};
  }
`;

const SendButton = Button.extend`
  padding: 1px;
  margin: 0px;
`;

const InfoText = styled.p`
  margin: 10px 0;
`;

const Icon = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const IconOk = Icon.extend`
  color: green;
  margin-right: 10px;
`;

const IconWarning = Icon.extend`
  color: orange;
  margin-right: 10px;
`;

const SubmissionOk = () => (
  <ButtonRow>
    <IconOk>
      <i className="fa fa-check-circle" />
    </IconOk>
    <InfoText>
      This post has passed our automated checks for inappropriate content
    </InfoText>
  </ButtonRow>
);

const SubmissionWarning = () => (
  <ButtonRow>
    <IconWarning>
      <i className="fa fa-exclamation-triangle" />
    </IconWarning>
    <InfoText>This post has been flagged and needs an admin review</InfoText>
  </ButtonRow>
);

const Sender = styled.div`
  height: 40px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: left;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 10px;
`;

const Avatar = styled.img`
  height: 60px;
  width: 60px;
`;

const AvatarContainer = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 6px;
  border: 1px solid rgb(76, 175, 80);
  overflow: hidden;
  min-height: 60px;
  min-width: 60px;
`;

const Message = styled.textarea`
  height: 20px;
  margin-left: 10px;
  outline: none;
  width: 100%;
  padding: 5px;
  box-shadow: inset 0 0 10px whitesmoke;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 6px;
  background: whitesmoke;
  &:focus {
    background: white;
  }
`;

const SubmissionText = styled.p`
  font-size: 16px;
  margin: 7px;
  padding: 0;
  white-space: pre-wrap;
`;

export const SenderBox = props => (
  <Sender>
    <ButtonRow>
      <SendButton onClick={() => props.postComment()}>
        <ButtonText>Send</ButtonText>
      </SendButton>
    </ButtonRow>
    <Message
      rows="4"
      placeholder="Your message to the submitter"
      value={props.currentMessage}
      onChange={props.onChange}
    />
  </Sender>
);

type Props = {
  loading: boolean,
  error: boolean,
  submission: any,
  fetchCurrentSubmission: Function,
  postToFbInstant: Function,
  removeSubmission: Function,
  deletePendingSubmission: Function,
  schedulePostToFb: Function,
  match: any,
  history: any,
  removeLoading: boolean,
  removeError: boolean,
  postingToFb: boolean,
  errorToFb: boolean,
  schedulingToFb: boolean,
  errorSchedulingToFb: boolean,
  addToModerationLoading: boolean,
  addToModerationError: boolean,
  addModerationSubmission: Function,
  editSubmissionLoading: boolean,
  editSubmissionError: boolean,
  editSubmission: Function,
  postComment: Function,
  postCommentLoading: boolean,
  postCommentError: boolean,
  commentsLoading: boolean,
  commentsError: boolean,
  fetchComments: Function,
  comments: any
};

class SubmissionControl extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      submissionText: "",
      editing: false,
      tempSubmissionText: "",
      currentMessage: "",
      moderation: false
    };
  }

  componentDidMount() {
    const { fetchCurrentSubmission, fetchComments, match } = this.props;
    fetchCurrentSubmission(match.params.submissionid);
    fetchComments(match.params.submissionid);
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      loading,
      removeLoading,
      history,
      postingToFb,
      schedulingToFb,
      addToModerationLoading,
      editSubmissionLoading,
      postCommentLoading,
      snackbarNotify
    } = this.props;

    const newSubmission = nextProps.submission;

    // Fetching submission
    if (loading && !nextProps.loading) {
      this.setState({
        submissionText: newSubmission.postText,
        tempSubmissionText: newSubmission.postText
      });
    }

    // Deleting the submission
    if (removeLoading && !nextProps.removeLoading && !nextProps.removeError) {
      history.goBack();
      snackbarNotify("The post has been removed");
    }

    // Posting submission to fb
    if (postingToFb && !nextProps.postingToFb && !nextProps.errorToFb) {
      history.goBack();
      snackbarNotify("Posted to Facebook");
    }

    //scheduling the submission to fb
    if (
      schedulingToFb &&
      !nextProps.schedulingToFb &&
      !nextProps.errorSchedulingToFb
    ) {
      history.goBack();
      snackbarNotify("The post has been scheduled");
    }

    //adding submission to moderation
    if (
      addToModerationLoading &&
      !nextProps.addToModerationLoading &&
      !nextProps.addToModerationError
    ) {
      snackbarNotify("Successfully added to moderation");
    }

    // save edited submission
    if (
      editSubmissionLoading &&
      !nextProps.editSubmissionLoading &&
      !nextProps.editSubmissionError
    ) {
      snackbarNotify("Your changes have been saved");
    }

    // post comment
    if (
      postCommentLoading &&
      !nextProps.postCommentLoading &&
      !nextProps.postCommentError
    ) {
      snackbarNotify("Successfully posted your comment");
    }
  }

  _renderSubmissionControl() {
    const {
      submission,
      loading,
      error,
      removeSubmission,
      history,
      deletePendingSubmission,
      match,
      postToFbInstant,
      schedulePostToFb,
      addModerationSubmission,
      editSubmission,
      postComment,
      comments,
      commentsLoading
    } = this.props;
    return (
      <Box
        style={{
          width: "1024px",
          maxWidth: "85%",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "auto"
        }}
      >
        <ContentWrapper style={{ transition: "height 0.5s ease" }}>
          <PageInfoWrapper>
            <Title>Submission Control</Title>
          </PageInfoWrapper>
          {!submission.review ? (
            <SubmissionOk />
          ) : (
            <div>
              <SubmissionWarning />
              {submission.pii || submission.profanity ? (
                <div>
                  <p>Post has been flagged for following reasons</p>
                  <ul>
                    {submission.profanity ? <li>Profanity</li> : null}
                    {submission.pii ? <li>Personal information</li> : null}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
          <SubTitle>Submission:</SubTitle>
          {!this.state.editing ? (
            <DisplaySubmission>
              <SubmissionText>{this.state.submissionText}</SubmissionText>
            </DisplaySubmission>
          ) : (
            <InputField
              rows="11"
              value={this.state.tempSubmissionText}
              onChange={event =>
                this.setState({ tempSubmissionText: event.target.value })
              }
            />
          )}
          {!this.state.editing ? (
            <ButtonRow>
              <Button onClick={() => this.setState({ editing: true })}>
                <ButtonText>Edit</ButtonText>
              </Button>
              {!submission.moderation && !this.state.moderation ? (
                <Button
                  warning
                  onClick={() => {
                    addModerationSubmission(submission.databaseId);
                    this.setState({ moderation: true });
                  }}
                >
                  <ButtonText>Request modification</ButtonText>
                </Button>
              ) : null}
            </ButtonRow>
          ) : (
            <ButtonRow>
              <Button
                onClick={() => {
                  editSubmission(
                    match.params.submissionid,
                    this.state.tempSubmissionText
                  );
                  this.setState(state => ({
                    editing: false,
                    submissionText: state.tempSubmissionText
                  }));
                }}
              >
                <ButtonText>Save</ButtonText>
              </Button>
              <Button
                onClick={() =>
                  this.setState(state => ({
                    editing: false,
                    tempSubmissionText: state.submissionText
                  }))
                }
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </ButtonRow>
          )}
          {submission.moderation || this.state.moderation
            ? [
                <SubTitle>Send (optional) message to the submitter: </SubTitle>,
                <CommentsContainer>
                  <Comments
                    comments={comments}
                    admin
                    loading={commentsLoading}
                  />
                  <SenderBox
                    postComment={() =>
                      postComment(
                        match.params.submissionid,
                        this.state.currentMessage,
                        "true"
                      )
                    }
                    currentMessage={this.state.currentMessage}
                    onChange={event =>
                      this.setState({ currentMessage: event.target.value })
                    }
                  />
                </CommentsContainer>
              ]
            : null}
          <PageFooter>
            <ButtonRow>
              <Button
                onClick={() => {
                  postToFbInstant(submission.databaseId, submission.pageId);
                }}
              >
                <ButtonText>Publish now</ButtonText>
              </Button>
              <Button
                onClick={() => {
                  schedulePostToFb(submission.databaseId, submission.pageId);
                }}
              >
                <ButtonText>Schedule</ButtonText>
              </Button>
              <Button
                alert
                onClick={() => {
                  removeSubmission(submission.databaseId);
                }}
              >
                <ButtonText>Delete</ButtonText>
              </Button>
            </ButtonRow>
          </PageFooter>
        </ContentWrapper>
      </Box>
    );
  }

  _renderError() {
    return <p> Error </p>;
  }

  _renderLoading() {
    return <p> Loading </p>;
  }

  render() {
    const { submission, loading, error } = this.props;

    return loading
      ? this._renderLoading()
      : !submission
        ? this._renderError()
        : this._renderSubmissionControl();
  }
}

export default SubmissionControl;
