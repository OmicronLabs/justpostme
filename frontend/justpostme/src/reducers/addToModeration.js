import {
  ADD_MODERATION_BEGIN,
  ADD_MODERATION_SUCCESS,
  ADD_MODERATION_ERROR
} from "../actions/addToModeration";

const initialState = {
  loading: false,
  error: false
};

const addToModeration = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MODERATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_MODERATION_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case ADD_MODERATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default addToModeration;
