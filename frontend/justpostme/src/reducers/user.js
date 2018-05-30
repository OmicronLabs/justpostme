const initialState = {
  id: null,
  token: null,
  loading: false,
  error: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [
        ...state,
        {
          id: action.userID,
          token: action.userToken
        }
      ];
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
    default:
      return state;
  }
};

export default user;
