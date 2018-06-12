import {
  FETCH_MODERATION_BEGIN,
  FETCH_MODERATION_SUCCESS,
  FETCH_MODERATION_ERROR,
  DELETE_MODERATION
} from "../actions/moderationSubmissions";

const initialState = {
  loading: false,
  error: false,
  submissions: []
};

const moderationSubmissions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODERATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_MODERATION_SUCCESS:
      return {
        ...state,
        loading: false,
        submissions: action.payload.submissions
      };

    case FETCH_MODERATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case DELETE_MODERATION:
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

export default moderationSubmissions;
