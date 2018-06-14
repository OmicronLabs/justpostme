import { connect } from "react-redux";
import { addUser, logIn } from "../../actions/userMeta";
import { postUserToServer } from "../../actions/user";

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
  },
  logIn: () => {
    dispatch(logIn());
  }
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  posting: state.user.loading,
  error: state.user.error,
  loggedIn: state.userMeta.loggedIn
  //TODO: add the values here
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
