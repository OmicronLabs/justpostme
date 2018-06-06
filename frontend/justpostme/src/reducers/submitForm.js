import {
  SUBMIT_FORM_BEGIN,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR
} from "../actions/submitForm";

const initialState = {
  loading: false,
  error: false
};

const submitForm = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case SUBMIT_FORM_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default submitForm;
