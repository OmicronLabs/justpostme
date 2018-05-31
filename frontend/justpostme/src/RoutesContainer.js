import React from "react";
import Routes from "./Routes";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps, null)(Routes);
