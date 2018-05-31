import {
  POST_USER_BEGIN,
  POST_USER_SUCCESS,
  POST_USER_ERROR
} from "../actions/user";

const initialState = {
  id: null,
  token: null,
  name: null,
  loading: false,
  error: false,
  loggedIn: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        id: action.userID,
        token: action.userToken,
        name: action.name
      };
    case POST_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case POST_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case POST_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    case "LOG_IN":
      return {
        ...state,
        loggedIn: true
      };
    default:
      return state;
  }
};

export default user;
