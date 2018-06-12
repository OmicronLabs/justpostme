import { connect } from "react-redux";
import { postToFbInstant } from "../../actions/postSubmission";
import { withRouter } from "react-router-dom";
import { deletePendingSubmission } from "../../actions/pendingSubmissions";
import { removeSubmission } from "../../actions/removeSubmission";
import SubmissionCard from "../../components/pageControl/SubmissionCard";

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  postToFbInstant: (postid, pageid) =>
    dispatch(postToFbInstant(postid, pageid)),
  deletePendingSubmission: id => dispatch(deletePendingSubmission(id)),
  removeSubmission: id => dispatch(removeSubmission(id))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SubmissionCard)
);
