//@flow

import React from "react";
import { Box, BoxWrapper } from "../common/Box";
import styled from "styled-components";
import "font-awesome/css/font-awesome.min.css";

type Props = {
  loading: boolean,
  error: boolean,
  submission: any,
  fetchCurrentSubmission: Function,
  match: any
};

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: rgb(76, 175, 80);
`;

const PageInfoWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid rgb(76, 175, 80);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const PageFooter = styled.div`
  width: 100%;
  border-top: 2px solid rgb(76, 175, 80);
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
`;

const DisplaySubmission = styled.div`
  border: 1px solid grey;
  min-height: 150px;
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

const Button = styled.div`
  background: ${props =>
    props.alert ? "red" : props.warning ? "orange" : "rgb(76, 175, 80)"};
  color: white;
  select: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px 10px 10px 0;
  &:hover {
    background: ${props =>
      props.alert ? "darkred" : props.warning ? "darkorange" : "green"};
  }
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

const MessageBox = styled.div`
  height: 80px;
  box-shadow: 0px 0px 4px 3px rgba(126, 149, 168, 0.5);
  border-radius: 20px;
  width: 80%;
  padding: 0 10px;
  margin-left: 20px;
`;

const Sender = styled.div`
  height: 80px;
  display: flex;
  justify-content: left;
  flex-direction: row;
  align-items: center;
  margin: 20px 0 40px;
`;

const Avatar = styled.img`
  height: 80px;
  width: 80px;
`;

const AvatarContainer = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 1px solid rgb(76, 175, 80);
  overflow: hidden;
`;

const Message = styled.textarea`
  width: 80%;
  box-shadow: 0px 0px 4px 3px rgba(126, 149, 168, 0.5);
  border-radius: 20px;
  padding: 5px;
  border: none;
  outline: none;
  margin-left: 20px;
  &:focus {
    box-shadow: 0px 0px 4px 3px rgb(76, 175, 80);
  }
`;

const SubmissionText = styled.p`
  margin: 7px;
  padding: 0;
  white-space: pre-wrap;
`;

export const SenderBox = props => (
  <Sender>
    <AvatarContainer>
      <Avatar src="http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" />
    </AvatarContainer>
    <Message
      rows="6"
      placeholder="Type your message to user here ..."
      value={props.currentMessage}
      onChange={props.onChange}
    />
  </Sender>
);

class SubmissionControl extends React.Component<Props> {
  constructor(props) {
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
    const { fetchCurrentSubmission, match } = this.props;
    fetchCurrentSubmission(match.params.submissionid);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { loading } = this.props;
    const newLoading = nextProps.loading;
    const newSubmission = nextProps.submission;

    if (loading && !newLoading) {
      this.setState({
        submissionText: newSubmission.postText,
        tempSubmissionText: newSubmission.postText
      });
    }
  }

  _renderSubmissionControl() {
    const { submission, loading, error } = this.props;

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
          overflow: "scroll",
          paddingBottom: "10px"
        }}
      >
        <ContentWrapper>
          <PageInfoWrapper>
            <Title>Submission control panel</Title>
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
          <SubTitle> Submission: </SubTitle>
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
          {!this.state.moderation ? (
            !this.state.editing ? (
              <ButtonRow>
                <Button onClick={() => this.setState({ editing: true })}>
                  <ButtonText>Edit</ButtonText>
                </Button>
                <Button
                  warning
                  onClick={() => this.setState({ moderation: true })}
                >
                  <ButtonText>Request modification</ButtonText>
                </Button>
              </ButtonRow>
            ) : (
              <ButtonRow>
                <Button
                  onClick={() =>
                    this.setState(state => ({
                      editing: false,
                      submissionText: state.tempSubmissionText
                    }))
                  }
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
            )
          ) : null}
          {this.state.moderation
            ? [
                <SubTitle>Send (optional) message to the submitter: </SubTitle>,
                <SenderBox
                  currentMessage={this.state.currentMessage}
                  onChange={event =>
                    this.setState({ currentMessage: event.target.value })
                  }
                />,
                <ButtonRow>
                  <Button
                    warning
                    onClick={() => this.setState({ moderation: false })}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button onClick={() => {}}>
                    <ButtonText>Send</ButtonText>
                  </Button>
                </ButtonRow>
              ]
            : null}
          <PageFooter>
            <ButtonRow>
              <Button onClick={() => {}}>
                <ButtonText>Publish now</ButtonText>
              </Button>
              <Button onClick={() => {}}>
                <ButtonText>Schedule</ButtonText>
              </Button>
              <Button alert onClick={() => {}}>
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
