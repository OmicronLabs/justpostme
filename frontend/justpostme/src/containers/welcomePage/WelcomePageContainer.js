import { connect } from "react-redux";
import { addUser, postUserToServer } from "../../actions/user";

import WelcomePage from "../../components/welcomePage/WelcomePage";

type User = {
  userID: string,
  accessToken: string,
  expiresIn: string,
  email: string,
  name: string
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addUser: user => {
    dispatch(addUser(user.userID, user.accessToken, user.name));
    postUserToServer(user)(dispatch);
    return user;
  }
});

export default connect(null, mapDispatchToProps)(WelcomePage);
