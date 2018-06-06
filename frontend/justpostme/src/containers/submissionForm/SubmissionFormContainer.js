//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCurrentPage } from "../../actions/currentPage";
import SubmissionForm from "../../components/submissionForm/SubmissionForm";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  currentPageLoading: state.currentPage.loading,
  currentPageError: state.currentPage.error,
  currentPage: state.currentPage.page
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchCurrentPage: id => dispatch(fetchCurrentPage(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubmissionForm)
);
