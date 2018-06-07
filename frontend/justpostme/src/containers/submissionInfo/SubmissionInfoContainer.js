//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCurrentSubmission } from "../../actions/currentSubmission";
import SubmissionInfo from "../../components/submissionInfo/SubmissionInfo";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.currentSubmission.loading,
  error: state.currentSubmission.error,
  submission: state.currentSubmission.submission
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchCurrentSubmission: hash => dispatch(fetchCurrentSubmission(hash))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubmissionInfo)
);
