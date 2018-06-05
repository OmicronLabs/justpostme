import {
  FETCH_PAGE_BEGIN,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_ERROR
} from "../actions/currentPage";

const initialState = {
  page: null,
  loading: false,
  error: null
};

const currentPage = (state = initialState, action) => {
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
        page: action.payload.page
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

export default currentPage;
