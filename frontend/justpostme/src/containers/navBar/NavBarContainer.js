import { connect } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import { logOut } from "../../actions/userMeta";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => ({
  userName: state.userMeta.name
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logOut: () => dispatch(logOut())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
