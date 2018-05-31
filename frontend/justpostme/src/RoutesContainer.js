import React from "react";
import Routes from "./Routes";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.userMeta.loggedIn
});

export default connect(mapStateToProps, null)(Routes);
