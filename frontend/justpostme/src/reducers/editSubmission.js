import {
  EDIT_SUBMISSION_BEGIN,
  EDIT_SUBMISSION_SUCCESS,
  EDIT_SUBMISSION_ERROR
} from "../actions/editSubmission";

const initialState = {
  loading: false,
  error: false
};

const editSubmission = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SUBMISSION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case EDIT_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case EDIT_SUBMISSION_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default editSubmission;
