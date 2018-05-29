import { connect } from "react-redux";
import { addUser } from "../../actions/user";
import WelcomePage from "../../components/welcomePage/WelcomePage";

const mapDispatchToProps = (dispatch, ownProps) => ({
  addUser: (userID, userToken) => dispatch(addUser(userID, userToken)),
  addUserToServer: (userID, userToken) => {}
});

export default connect(null, mapDispatchToProps)(WelcomePage);
