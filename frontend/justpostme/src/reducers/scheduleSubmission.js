import {
  SCHEDULE_TO_FB_BEGIN,
  SCHEDULE_TO_FB_SUCCESS,
  SCHEDULE_TO_FB_ERROR
} from "../actions/scheduleSubmission";

const initialState = {
  loading: false,
  error: false
};

const scheduleSubmission = (state = initialState, action) => {
  switch (action.type) {
    case "SCHEDULE_TO_FB_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case SCHEDULE_TO_FB_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case SCHEDULE_TO_FB_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default scheduleSubmission;
