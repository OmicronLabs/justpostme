import {
  FETCH_MANAGED_BEGIN,
  FETCH_MANAGED_SUCCESS,
  FETCH_MANAGED_ERROR
} from "../actions/managedPages";

const initialState = {
  pages: [],
  loading: false,
  error: null
};

const managedPages = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MANAGED_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_MANAGED_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages
      };

    case FETCH_MANAGED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        pages: []
      };

    default:
      return state;
  }
};

export default managedPages;
