import { connect } from "react-redux";
import { fetchModerationSubmissions } from "../../actions/moderationSubmissions";

import ModerationSubmissions from "../../components/pageControl/ModerationSubmissions";

const mapStateToProps = state => ({
  submissions: state.moderationSubmissions.submissions,
  loading: state.moderationSubmissions.loading,
  error: state.moderationSubmissions.error,
  userID: state.userMeta.id,
  accessToken: state.userMeta.token,
  postingToFb: state.postSubmission.postingLoading,
  errorToFb: state.postSubmission.postingError
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchModerationSubmissions: id => dispatch(fetchModerationSubmissions(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModerationSubmissions);
