//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCurrentSubmission } from "../../actions/currentSubmission";
import { removeSubmission } from "../../actions/removeSubmission";
import SubmissionControl from "../../components/pageControl/SubmissionControl";
import { deletePendingSubmission } from "../../actions/pendingSubmissions";
import { postToFbInstant } from "../../actions/postSubmission";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.currentSubmission.loading,
  error: state.currentSubmission.error,
  submission: state.currentSubmission.submission,
  removeLoading: state.removeSubmission.loading,
  removeError: state.removeSubmission.error,
  postingToFb: state.postSubmission.postingLoading,
  errorToFb: state.postSubmission.postingError
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchCurrentSubmission: hash => dispatch(fetchCurrentSubmission(hash)),
  removeSubmission: id => dispatch(removeSubmission(id)),
  deletePendingSubmission: id => dispatch(deletePendingSubmission(id)),
  postToFbInstant: (postid, pageid) => dispatch(postToFbInstant(postid, pageid))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubmissionControl)
);
