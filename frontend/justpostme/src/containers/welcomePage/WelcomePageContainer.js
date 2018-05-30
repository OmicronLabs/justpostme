import { connect } from "react-redux";
import { addUser, postUserToServer } from "../../actions/user";

import WelcomePage from "../../components/welcomePage/WelcomePage";

type User = {
  userID: string,
  accessToken: string,
  expiresIn: string,
  email: string
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addUser: user => {
    console.log(user);
    dispatch(addUser(user.userID, user.accessToken));
    postUserToServer(user)(dispatch);
  }
});

export default connect(null, mapDispatchToProps)(WelcomePage);
