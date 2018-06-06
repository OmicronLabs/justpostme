import { connect } from "react-redux";
import { postToFbInstant } from "../../actions/postSubmission";
import { deletePendingSubmission } from "../../actions/pendingSubmissions";
import SubmissionCard from "../../components/pageControl/SubmissionCard";

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  postToFbInstant: (postid, pageid) =>
    dispatch(postToFbInstant(postid, pageid)),
  deletePendingSubmission: id => dispatch(deletePendingSubmission(id))
});

export default connect(
  null,
  mapDispatchToProps
)(SubmissionCard);

