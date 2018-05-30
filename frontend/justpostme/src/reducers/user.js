const initialState = {
  id: null,
  token: null,
  name: null,
  loading: false,
  error: null,
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
    case "FETCH_UNMANAGED_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_UNMANAGED_SUCCESS":
      return {
        ...state,
        loading: false
      };

    case "FETCH_UNMANAGED_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error
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
