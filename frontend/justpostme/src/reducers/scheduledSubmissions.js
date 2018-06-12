import {
  FETCH_SCHEDULED_BEGIN,
  FETCH_SCHEDULED_SUCCESS,
  FETCH_SCHEDULED_ERROR,
  DELETE_SCHEDULED
} from "../actions/scheduledSubmissions";

const initialState = {
  loading: false,
  error: false,
  submissions: []
};

const scheduledSubmissions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHEDULED_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SCHEDULED_SUCCESS:
      return {
        ...state,
        loading: false,
        submissions: action.payload.submissions
      };

    case FETCH_SCHEDULED_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case DELETE_SCHEDULED:
      return {
        ...state,
        submissions: state.submissions.filter(
          submission => submission.databaseId !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default scheduledSubmissions;
