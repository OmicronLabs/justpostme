import { connect } from "react-redux";
import NavBar from "../../components/navBar/NavBar";

const mapStateToProps = (state, ownProps) => ({
  userName: state.user.name
});

export default connect(mapStateToProps, null)(NavBar);
