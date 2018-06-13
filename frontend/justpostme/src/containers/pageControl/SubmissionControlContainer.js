//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCurrentSubmission } from "../../actions/currentSubmission";
import { removeSubmission } from "../../actions/removeSubmission";
import SubmissionControl from "../../components/pageControl/SubmissionControl";
import { deletePendingSubmission } from "../../actions/pendingSubmissions";
import { postToFbInstant } from "../../actions/postSubmission";
import { schedulePostToFb } from "../../actions/scheduleSubmission";
import { addModerationSubmission } from "../../actions/addToModeration";
import { editSubmission } from "../../actions/editSubmission";
import { postComment } from "../../actions/postComment";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.currentSubmission.loading,
  error: state.currentSubmission.error,
  submission: state.currentSubmission.submission,
  removeLoading: state.removeSubmission.loading,
  removeError: state.removeSubmission.error,
  postingToFb: state.postSubmission.postingLoading,
  errorToFb: state.postSubmission.postingError,
  schedulingToFb: state.scheduleSubmission.loading,
  errorSchedulingToFb: state.scheduleSubmission.error,
  addToModerationLoading: state.addToModeration.loading,
  addToModerationError: state.addToModeration.error,
  editSubmissionLoading: state.editSubmission.loading,
  editSubmissionError: state.editSubmission.error,
  postCommentLoading: state.postComment.loading,
  postCommentError: state.postComment.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchCurrentSubmission: hash => dispatch(fetchCurrentSubmission(hash)),
  removeSubmission: id => dispatch(removeSubmission(id)),
  deletePendingSubmission: id => dispatch(deletePendingSubmission(id)),
  postToFbInstant: (postid, pageid) =>
    dispatch(postToFbInstant(postid, pageid)),
  schedulePostToFb: (postid, pageid) =>
    dispatch(schedulePostToFb(postid, pageid)),
  addModerationSubmission: id => dispatch(addModerationSubmission(id)),
  editSubmission: (postid, text) => dispatch(editSubmission(postid, text)),
  postComment: (postHash, text, admin) =>
    dispatch(postComment(postHash, text, admin))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubmissionControl)
);
