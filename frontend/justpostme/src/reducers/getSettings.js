import {
  GET_SETTINGS_BEGIN,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_ERROR
} from "../actions/getSettings";

const initialState = {
  loading: false,
  error: false,
  preText: "",
  postText: "",
  countFrom: 0,
  timeInterval: 10
};

const getSettings = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        preText: action.payload.preText,
        postText: action.payload.postText,
        countFrom: action.payload.countFrom,
        timeInterval: action.payload.timeInterval
      };

    case GET_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default getSettings;
