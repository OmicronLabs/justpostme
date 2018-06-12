import { connect } from "react-redux";
import { fetchScheduledSubmissions } from "../../actions/scheduledSubmissions";
import ScheduledSubmissions from "../../components/pageControl/ScheduledSubmissions";

const mapStateToProps = state => ({
  submissions: state.pendingSubmissions.submissions,
  loading: state.pendingSubmissions.loading,
  error: state.pendingSubmissions.error,
  userID: state.userMeta.id,
  accessToken: state.userMeta.token,
  postingToFb: state.postSubmission.postingLoading,
  errorToFb: state.postSubmission.postingError
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchScheduledSubmissions: id => dispatch(fetchScheduledSubmissions(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledSubmissions);
