import {
  STATS_GET_BEGIN,
  STATS_GET_SUCCESS,
  STATS_GET_ERROR
} from "../actions/getUsageStats";

const initialState = {
  loading: false,
  error: false,
  totalSubmissions: 0,
  totalPages: 0
};

const getUsageStats = (state = initialState, action) => {
  switch (action.type) {
    case STATS_GET_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case STATS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        totalSubmissions: action.payload.totalSubmissions,
        totalPages: action.payload.totalPages
      };

    case STATS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default getUsageStats;
