import {
  SAVE_SETTINGS_BEGIN,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_ERROR
} from "../actions/saveSettings";

const initialState = {
  loading: false,
  error: false
};

const saveSettings = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SETTINGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SAVE_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case SAVE_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default saveSettings;
