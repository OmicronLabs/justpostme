//@flow

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ManagePages from "../../components/dashboardPage/ManagePages";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  posting: state.addManagedPage.loading || state.removeManagedPage.loading,
  error: state.addManagedPage.error || state.removeManagedPage.error
});

export default withRouter(connect(mapStateToProps, null)(ManagePages));
