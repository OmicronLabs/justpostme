import {
  FETCH_PENDING_BEGIN,
  FETCH_PENDING_SUCCESS,
  FETCH_PENDING_ERROR,
  DELETE_PENDING
} from "../actions/pendingSubmissions";

const initialState = {
  loading: false,
  error: false,
  submissions: []
};

const pendingSubmissions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PENDING_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        submissions: action.payload.submissions
      };

    case FETCH_PENDING_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case DELETE_PENDING:
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

export default pendingSubmissions;
