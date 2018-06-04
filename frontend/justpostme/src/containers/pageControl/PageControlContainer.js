//@flow

import { connect } from "react-redux";
import { addToManagedServer } from "../../actions/addManagedPage";

import PageControl from "../../components/pageControl/PageControl";

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   addToManagedServer: id => dispatch(addToManagedServer(id))
// });

// const mapStateToProps = (state, ownProps) => ({
//   ...ownProps,
//   posting: state.addManagedPage.loading,
//   error: state.addManagedPage.error
// });

export default PageControl;
