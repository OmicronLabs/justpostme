import {
  REMOVE_SUBMISSION_BEGIN,
  REMOVE_SUBMISSION_SUCCESS,
  REMOVE_SUBMISSION_ERROR
} from "../actions/removeSubmission";

const initialState = {
  loading: false,
  error: false
};

const removeSubmission = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_SUBMISSION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case REMOVE_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case REMOVE_SUBMISSION_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default removeSubmission;
