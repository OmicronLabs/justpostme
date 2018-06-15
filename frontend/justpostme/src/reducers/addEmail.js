import {
  POST_EMAIL_BEGIN,
  POST_EMAIL_SUCCESS,
  POST_EMAIL_ERROR
} from "../actions/addEmail";

const initialState = {
  loading: false,
  error: false
};

const addEmail = (state = initialState, action) => {
  switch (action.type) {
    case POST_EMAIL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case POST_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case POST_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default addEmail;
