import {
  FETCH_SUBMISSION_BEGIN,
  FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_ERROR
} from "../actions/currentSubmission";

const initialState = {
  submission: null,
  loading: false,
  error: null
};

const currentSubmission = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        page: action.payload.submission
      };

    case FETCH_PAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        page: null
      };

    default:
      return state;
  }
};

export default currentSubmission;
