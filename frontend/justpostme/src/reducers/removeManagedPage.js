import {
  REMOVE_FROM_MANAGED_BEGIN,
  REMOVE_FROM_MANAGED_SUCCESS,
  REMOVE_FROM_MANAGED_ERROR
} from "../actions/removeManagedPage";

const initialState = {
  loading: false,
  error: false
};

const removeManagedPage = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FROM_MANAGED_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case REMOVE_FROM_MANAGED_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case REMOVE_FROM_MANAGED_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default removeManagedPage;
