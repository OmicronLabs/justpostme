//@flow

import React from "react";

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

  render() {
    const { submission, loading, error } = this.props;

    return loading ? (
      <p> Loading </p>
    ) : !submission ? (
      <p> Error </p>
    ) : (
      <div>
        <p> Submission: </p>
        <p>{submission.postText}</p>
        <p> should review: </p>
        <p>{submission.review === true ? "true" : "false"}</p>
        <p> personal info: </p>
        <p>{submission.pii === true ? "true" : "false"}</p>
        <p> Profanity: </p>
        <p> {submission.profanity === true ? "true" : "false"} </p>
      </div>
    );
  }
}

export default SubmissionControl;
