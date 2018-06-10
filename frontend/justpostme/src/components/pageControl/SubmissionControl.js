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
  margin: 5px;
`;

const Button = styled.div`
  background: rgb(76, 175, 80);
  color: white;
  select: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 10px 10px 10px 0;
  &:hover {
    background: green;
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
      This post has passed our automated checks for sensitive content
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

class SubmissionControl extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { submissionText: "", editing: false };
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
      this.setState({ submissionText: newSubmission.postText });
    }
  }

  _renderSubmissionControl() {
    const { submission, loading, error } = this.props;

    return (
      <Box
        style={{
          width: "1024px",
          maxWidth: "85%",
          minHeight: "600px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start"
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
              <p>{submission.postText}</p>
            </DisplaySubmission>
          ) : (
            <InputField
              rows="11"
              value={this.state.submissionText}
              onChange={event =>
                this.setState({ submissionText: event.target.value })
              }
            />
          )}
          {!this.state.editing ? (
            <ButtonRow>
              <Button onClick={() => this.setState({ editing: true })}>
                <ButtonText>Edit</ButtonText>
              </Button>
            </ButtonRow>
          ) : (
            <ButtonRow>
              <Button onClick={() => this.setState({ editing: false })}>
                <ButtonText>Save</ButtonText>
              </Button>
              <Button onClick={() => this.setState({ editing: false })}>
                <ButtonText>Cancel</ButtonText>
              </Button>
            </ButtonRow>
          )}
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
