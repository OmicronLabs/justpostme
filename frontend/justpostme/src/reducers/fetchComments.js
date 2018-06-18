import {
  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  ADD_COMMENT
} from "../actions/fetchComments";

const initialState = {
  loading: false,
  error: false,
  comments: []
};

const fetchComments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload.comments
      };

    case FETCH_COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case ADD_COMMENT:
      const newComments = state.comments;
      newComments.push(action.payload.comment);
      return {
        ...state,
        comments: newComments
      };
    default:
      return state;
  }
};

export default fetchComments;
