import { connect } from "react-redux";
import { addUser, logIn } from "../../actions/userMeta";
import { postUserToServer } from "../../actions/user";
import { getUsageStats } from "../../actions/getUsageStats";

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
  },
  fetchUsageStats: () => dispatch(getUsageStats())
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  posting: state.user.loading,
  error: state.user.error,
  loggedIn: state.userMeta.loggedIn,
  totalPages: state.getUsageStats.totalPages,
  totalSubmissions: state.getUsageStats.totalSubmissions
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
