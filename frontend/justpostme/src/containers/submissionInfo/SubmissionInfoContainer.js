//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCurrentSubmission } from "../../actions/currentSubmission";
import SubmissionInfo from "../../components/submissionInfo/SubmissionInfo";
import { editSubmission } from "../../actions/editSubmission";
import { postComment } from "../../actions/postComment";
import { removeSubmission } from "../../actions/removeSubmission";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.currentSubmission.loading,
  error: state.currentSubmission.error,
  submission: state.currentSubmission.submission,
  editSubmissionLoading: state.editSubmission.loading,
  editSubmissionError: state.editSubmission.error,
  postCommentLoading: state.postComment.loading,
  postCommentError: state.postComment.error,
  removeLoading: state.removeSubmission.loading,
  removeError: state.removeSubmission.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchCurrentSubmission: hash => dispatch(fetchCurrentSubmission(hash)),
  editSubmission: (postid, text) => dispatch(editSubmission(postid, text)),
  postComment: (postHash, text, admin) =>
    dispatch(postComment(postHash, text, admin)),
  removeSubmission: id => dispatch(removeSubmission(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubmissionInfo)
);
