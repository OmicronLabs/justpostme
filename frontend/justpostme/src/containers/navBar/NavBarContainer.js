import { connect } from "react-redux";
import Link from "../../components/navBar/NavBar";

const mapStateToProps = (state, ownProps) => ({
  userID: state.userID,
  accessToken: state.accessToken
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
