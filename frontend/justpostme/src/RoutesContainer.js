import React from "react";
import Routes from "./Routes";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.userMeta.loggedIn,
  showSnackbar: state.snackbar.showSnackbar,
  snackbarMessage: state.snackbar.message
});

export default connect(
  mapStateToProps,
  null
)(Routes);
