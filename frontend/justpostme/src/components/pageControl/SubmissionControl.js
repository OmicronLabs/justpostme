//@flow

import React from "react";
import { Box, BoxWrapper } from "../common/Box";

type Props = {
  loading: boolean,
  error: boolean,
  submission: any,
  fetchCurrentSubmission: Function,
  match: any
};

class SubmissionControl extends React.Component<Props> {
  componentDidMount() {
    const { fetchCurrentSubmission, match } = this.props;
    fetchCurrentSubmission(match.params.submissionid);
  }

  _renderSubmissionControl() {
    const { submission, loading, error } = this.props;

    return (
      <Box
        style={{
          width: "1024px",
          maxWidth: "85%",
          minHeight: "600px",
          marginTop: "10px"
        }}
      >
        <p> Submission: </p>
        <p>{submission.postText}</p>
        <p> should review: </p>
        <p>{submission.review === true ? "true" : "false"}</p>
        <p> personal info: </p>
        <p>{submission.pii === true ? "true" : "false"}</p>
        <p> Profanity: </p>
        <p> {submission.profanity === true ? "true" : "false"} </p>
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
