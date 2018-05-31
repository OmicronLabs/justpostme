const initialState = {
  id: null,
  token: null,
  name: null,
  loggedIn: false
};

const userMeta = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        id: action.userID,
        token: action.userToken,
        name: action.name
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

export default userMeta;
