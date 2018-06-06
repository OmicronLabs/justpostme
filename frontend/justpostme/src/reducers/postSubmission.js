import {
  POST_TO_FB_BEGIN,
  POST_TO_FB_SUCCESS,
  POST_TO_FB_ERROR
} from "../actions/postSubmission";

const initialState = {
  postingLoading: false,
  postingError: false
};

const postSubmission = (state = initialState, action) => {
  switch (action.type) {
    case POST_TO_FB_BEGIN:
      return {
        ...state,
        postingLoading: true,
        postingError: null
      };

    case POST_TO_FB_SUCCESS:
      return {
        ...state,
        postingLoading: false
      };

    case POST_TO_FB_ERROR:
      return {
        ...state,
        postingLoading: false,
        postingError: true
      };

    default:
      return state;
  }
};

export default postSubmission;
