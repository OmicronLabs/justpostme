import {
  FETCH_UNMANAGED_BEGIN,
  FETCH_UNMANAGED_SUCCESS,
  FETCH_UNMANAGED_ERROR
} from "../actions/unmanagedPages";

const initialState = {
  pages: [],
  loading: false,
  error: null
};

const unmanagedPages = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNMANAGED_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_UNMANAGED_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages
      };

    case FETCH_UNMANAGED_ERROR:
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

export default unmanagedPages;
