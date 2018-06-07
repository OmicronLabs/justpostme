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
    ) : error ? (
      <p> Error </p>
    ) : (
      <div>
        <p> Submission: </p>
        <p>{submission.postText}</p>
        <p> should review: </p>
        <p>{submission.review}</p>
        <p> personal info: </p>
        <p>{submission.pii}</p>
        <p> Should review: </p>
        <p> {submission.review} </p>
      </div>
    );
  }
}

export default SubmissionControl;
