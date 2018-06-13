import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { snackbarNotify } from "../../actions/snackbar";
import SubmissionsDisplay from "../../components/pageControl/SubmissionsDisplay";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  removeLoading: state.removeSubmission.loading,
  removeError: state.removeSubmission.error,
  postingToFb: state.postSubmission.postingLoading,
  errorToFb: state.postSubmission.postingError,
  schedulingToFb: state.scheduleSubmission.loading,
  errorSchedulingToFb: state.scheduleSubmission.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  snackbarNotify: message => dispatch(snackbarNotify(message))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubmissionsDisplay)
);
