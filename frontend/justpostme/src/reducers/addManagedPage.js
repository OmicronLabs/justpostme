import {
  ADD_TO_MANAGED_BEGIN,
  ADD_TO_MANAGED_SUCCESS,
  ADD_TO_MANAGED_ERROR
} from "../actions/addManagedPage";

const initialState = {
  loading: false,
  error: false
};

const addManagedPage = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_MANAGED_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_TO_MANAGED_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case ADD_TO_MANAGED_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default addManagedPage;
