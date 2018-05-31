import { connect } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => ({
  userName: state.userMeta.name
});

export default withRouter(connect(mapStateToProps, null)(NavBar));
