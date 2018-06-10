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
  margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
  width: 85%;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: gray;
  margin: 5px 0;
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

const SubmissionOk = () => {};

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

          <p> should review: </p>
          <p>{submission.review === true ? "true" : "false"}</p>
          <p> personal info: </p>
          <p>{submission.pii === true ? "true" : "false"}</p>
          <p> Profanity: </p>
          <p> {submission.profanity === true ? "true" : "false"} </p>
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
