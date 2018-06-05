import { connect } from "react-redux";
import { postToFbInstant } from "../../actions/postSubmission";
import SubmissionCard from "../../components/pageControl/SubmissionCard";

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  postToFbInstant: (postid, pageid) => dispatch(postToFbInstant(postid, pageid))
});

export default connect(null, mapDispatchToProps)(SubmissionCard);
