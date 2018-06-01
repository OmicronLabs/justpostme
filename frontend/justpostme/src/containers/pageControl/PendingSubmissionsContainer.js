import { connect } from "react-redux";
import { fetchPendingSubmissions } from "../../actions/pendingSubmissions";
import PendingSubmissions from "../../components/pageControl/PendingSubmissions";

const mapStateToProps = state => ({
  submissions: state.pendingSubmissions.submissions,
  loading: state.pendingSubmissions.loading,
  error: state.pendingSubmissions.error,
  userID: state.userMeta.id,
  accessToken: state.userMeta.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchPendingSubmissions: id => dispatch(fetchPendingSubmissions(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingSubmissions);
