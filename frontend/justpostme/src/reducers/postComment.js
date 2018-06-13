import {
  POST_COMMENT_BEGIN,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR
} from "../actions/postComment";

const initialState = {
  loading: false,
  error: false
};

const postComment = (state = initialState, action) => {
  switch (action.type) {
    case POST_COMMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case POST_COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default postComment;
