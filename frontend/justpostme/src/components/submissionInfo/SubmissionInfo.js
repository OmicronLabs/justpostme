//@flow
import React from "react";
import styled from "styled-components";
import Comments from "../common/Comments";
import {
  FrontDoorRelative,
  FrontDoorBackgroundBottom,
  FrontDoorBackgroundTop,
  HeaderLogoText,
  HeaderTopLeft,
  HeaderTopRight,
  LogoWhite,
  BackgroundShape,
  WelcomePageBox,
  About
} from "../welcomePage/WelcomePage.style";
import "font-awesome/css/font-awesome.min.css";
import { Box, BoxWrapper } from "../common/Box";
import {
  LargeThemedButton,
  TopMenuButton,
  RoundButton
} from "../common/Buttons";
import logo from "../../media/logo-white.png";
import background from "../../media/LoginBackground.svg";
import { SenderBox } from "../pageControl/SubmissionControl";

const ContentWrapper = styled.div`
  width: 85%;
`;

const PageInfoWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: rgb(76, 175, 80);
`;

const ErrorText = styled.a`
  font-weight: 800;
  font-size: 26px;
  color: grey;
  margin-left: 5px;
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

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
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
  min-height: 150px;
  width: 100%;
  overflow: scroll;
`;

const SubmissionText = styled.p`
  width: 100%;
  font-size: 16px;
  margin: 7px;
  padding: 0;
  white-space: pre-wrap;
`;

const ButtonText = styled.div`
  margin: 5px 10px;
`;

const Button = RoundButton.extend`
  margin: 5px;
  margin-top: 1em;
  border-radius: 6px;
  padding: 0px;
  color: ${props => (props.warning ? "orange" : "rgb(76,175, 80)")};
  border: ${props =>
    props.warning ? "1px solid orange" : "1px solid rgb(76,175, 80)"};
  &:hover {
    box-shadow: inset 0 0 10px whitesmoke;
    border: 0px;
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

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: rgb(76, 175, 80);
  margin: 10px 0;
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

type Props = {
  loading: boolean,
  error: boolean,
  submission: any,
  fetchCurrentSubmission: Function,
  editSubmissionLoading: boolean,
  editSubmissionError: boolean,
  postCommentLoading: boolean,
  postCommentError: boolean,
  removeLoading: boolean,
  removeError: boolean,
  editSubmission: Function,
  postComment: Function,
  removeSubmission: Function,
  commentsLoading: boolean,
  commentsError: boolean,
  fetchComments: Function,
  comments: any,
  snackbarNotify: Function
};

class SubmissionForm extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      submissionText: "",
      editing: false,
      tempSubmissionText: ""
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      loading,
      editSubmissionLoading,
      removeLoading,
      postCommentLoading,
      snackbarNotify
    } = this.props;
    const newLoading = nextProps.loading;
    const newSubmission = nextProps.submission;

    if (loading && !newLoading) {
      this.setState({
        submissionText: newSubmission.postText,
        tempSubmissionText: newSubmission.postText
      });
    }

    //edit submission
    if (
      editSubmissionLoading &&
      !nextProps.editSubmissionLoading &&
      nextProps.editSubmissionError
    ) {
      snackbarNotify("Your changes have been saved");
    }

    //remove submission
    if (removeLoading && !nextProps.removeLoading && !nextProps.removeError) {
      snackbarNotify("The post has been removed");
    }

    //post comment
    if (
      editSubmissionLoading &&
      !nextProps.editSubmissionLoading &&
      !nextProps.editSubmissionError
    ) {
      snackbarNotify("Successfully posted a comment");
    }
  }

  componentDidMount() {
    const { fetchCurrentSubmission, match, fetchComments } = this.props;
    fetchCurrentSubmission(match.params.id);
    fetchComments(match.params.id);
  }

  _renderButtons() {
    const { editSubmission, match, removeSubmission, submission } = this.props;

    return !this.state.editing ? (
      <ButtonRow style={{ justifyContent: "space-between" }}>
        <Button onClick={() => this.setState({ editing: true })}>
          <ButtonText>Edit</ButtonText>
        </Button>
        <Button warning onClick={() => removeSubmission(submission.databaseId)}>
          <ButtonText>Remove</ButtonText>
        </Button>
      </ButtonRow>
    ) : (
      <ButtonRow>
        <Button
          onClick={() => {
            editSubmission(match.params.id, this.state.tempSubmissionText);
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
    );
  }

  _renderEditSubmission() {
    return [
      this.state.editing ? (
        <InputField
          rows="8"
          value={this.state.tempSubmissionText}
          onChange={event =>
            this.setState({ tempSubmissionText: event.target.value })
          }
        />
      ) : (
        this._renderSubmission()
      ),
      this._renderButtons()
    ];
  }

  _renderSubmission() {
    return (
      <DisplaySubmission>
        <SubmissionText>{this.state.submissionText}</SubmissionText>
      </DisplaySubmission>
    );
  }

  _renderContentModerationInfo() {
    const { submission } = this.props;
    return !submission.review ? (
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
    );
  }

  _renderInfo() {
    const {
      submission,
      comments,
      commentsLoading,
      postComment,
      match
    } = this.props;

    return submission.profanity !== null ? (
      <ContentWrapper>
        <PageInfoWrapper>
          <Title>Submission Tracking</Title>
        </PageInfoWrapper>
        {submission.moderation ? this._renderContentModerationInfo() : null}
        <ButtonRow>
          <p> Submission status: </p>
          <p>
            {submission.moderation
              ? "MODERATION "
              : submission.pending
                ? "PENDING"
                : "ACCEPTED"}
          </p>
        </ButtonRow>
        <SubTitle>
          Your submission (you can edit or remove it while i's pending or under
          moderation)
        </SubTitle>
        {submission.pending
          ? this._renderEditSubmission()
          : this._renderSubmission()}
        {submission.moderation
          ? [
              <SubTitle>Chat with admin</SubTitle>,
              <Comments comments={comments} loading={commentsLoading} />,
              <SenderBox
                currentMessage={this.state.currentMessage}
                onChange={event =>
                  this.setState({ currentMessage: event.target.value })
                }
              />,
              <ButtonRow>
                <Button
                  onClick={() => {
                    postComment(
                      match.params.id,
                      this.state.currentMessage,
                      "false"
                    );
                  }}
                >
                  <ButtonText>Send</ButtonText>
                </Button>
              </ButtonRow>
            ]
          : null}
      </ContentWrapper>
    ) : (
      <ContentWrapper>
        <PageInfoWrapper>
          <Title>Submission Tracking</Title>
        </PageInfoWrapper>
        <p> Your submission is being processed</p>
      </ContentWrapper>
    );
  }

  _renderLoading() {
    return <p>Loading</p>;
  }

  _renderError() {
    return <ErrorText>Error, link is broken :( </ErrorText>;
  }

  render() {
    const { loading, submission } = this.props;

    return (
      <FrontDoorRelative>
        <FrontDoorBackgroundTop>
          <HeaderTopLeft>
            <LogoWhite src={logo} />

            <HeaderLogoText>justpost.me</HeaderLogoText>
          </HeaderTopLeft>
          <HeaderTopRight>
            <TopMenuButton href="#">About</TopMenuButton>
          </HeaderTopRight>
        </FrontDoorBackgroundTop>
        <BackgroundShape src={background} className="" />
        <FrontDoorBackgroundBottom />
        <BoxWrapper
          style={{
            overflow: "scroll",
            height: "100vh"
          }}
        >
          <WelcomePageBox
            style={{
              width: "940px",
              maxWidth: "75%",
              margin: "100px 0",
              padding: "0",
              height: "auto",
              position: "relative",
              display: "flex",
              justifyContent: "flex-start",
              minHeight: "650px"
            }}
          >
            {loading
              ? this._renderLoading()
              : submission
                ? this._renderInfo()
                : this._renderError()}
          </WelcomePageBox>
        </BoxWrapper>
      </FrontDoorRelative>
    );
  }
}

export default SubmissionForm;
