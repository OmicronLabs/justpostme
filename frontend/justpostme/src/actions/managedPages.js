//@flow

export const FETCH_MANAGED_BEGIN = "FETCH_MANAGED_BEGIN";
export const FETCH_MANAGED_SUCCESS = "FETCH_MANAGED_SUCCESS";
export const FETCH_MANAGED_ERROR = "FETCH_MANAGED_ERROR";

export const fetchManagedBegin = () => ({
  type: FETCH_MANAGED_BEGIN
});

export const fetchManagedSuccess = pages => ({
  type: FETCH_MANAGED_SUCCESS,
  payload: { pages }
});

export const fetchManagedError = error => ({
  type: FETCH_MANAGED_ERROR,
  payload: { error }
});
