import { SNACKBAR_SHOW, SNACKBAR_HIDE } from "../actions/snackbar";

const initialState = {
  showSnackbar: false,
  message: undefined
};

const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case SNACKBAR_SHOW:
      return {
        ...state,
        showSnackbar: true,
        message: action.payload.message
      };

    case SNACKBAR_HIDE:
      return {
        ...state,
        showSnackbar: false
      };

    default:
      return state;
  }
};

export default snackbar;
