//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveSettings } from "../../actions/saveSettings";
import { getSettings, getSettingsBegin } from "../../actions/getSettings";
import { snackbarNotify } from "../../actions/snackbar";
import PageSettings from "../../components/pageControl/PageSettings";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  saveSettingsLoading: state.saveSettings.loading,
  saveSettingsError: state.saveSettings.error,
  getSettingsLoading: state.getSettings.loading,
  getSettingsError: state.getSettings.error,
  preText: state.getSettings.preText,
  postText: state.getSettings.postText,
  countFrom: state.getSettings.countFrom,
  timeInterval: state.getSettings.timeInterval
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  saveSettings: (pageId, preText, postText, countFrom, timeInterval) =>
    dispatch(saveSettings(pageId, preText, postText, countFrom, timeInterval)),
  getSettings: pageId => dispatch(getSettings(pageId)),
  snackbarNotify: message => dispatch(snackbarNotify(message))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageSettings)
);
