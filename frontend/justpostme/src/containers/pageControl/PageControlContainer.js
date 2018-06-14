//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCurrentPage } from "../../actions/currentPage";
import PageControl from "../../components/pageControl/PageControl";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  currentPageLoading: state.currentPage.loading,
  currentPage: state.currentPage.page,
  currentSubmission: state.currentSubmission.submission
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchCurrentPage: id => dispatch(fetchCurrentPage(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageControl)
);
