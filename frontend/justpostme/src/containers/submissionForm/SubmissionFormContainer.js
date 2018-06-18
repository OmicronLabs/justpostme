//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCurrentPage } from "../../actions/currentPage";
import { submitForm } from "../../actions/submitForm";
import SubmissionForm from "../../components/submissionForm/SubmissionForm";
import { snackbarNotify } from "../../actions/snackbar";
import { postEmail } from "../../actions/addEmail";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  currentPageLoading: state.currentPage.loading,
  currentPageError: state.currentPage.error,
  currentPage: state.currentPage.page,
  postHash: state.submitForm.postId,
  submitFormLoading: state.submitForm.loading,
  submitFormError: state.submitForm.error,
  postEmailLoading: state.addEmail.loading,
  postEmailError: state.addEmail.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  fetchCurrentPage: id => dispatch(fetchCurrentPage(id)),
  submitForm: (id, text) => dispatch(submitForm(id, text)),
  snackbarNotify: message => dispatch(snackbarNotify(message)),
  postEmail: (postHash, email) => dispatch(postEmail(postHash, email))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubmissionForm)
);
