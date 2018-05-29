//@flow

export const FETCH_UNMANAGED_BEGIN = "FETCH_MANAGED_BEGIN";
export const FETCH_UNMANAGED_SUCCESS = "FETCH_MANAGED_SUCCESS";
export const FETCH_UNMANAGED_ERROR = "FETCH_MANAGED_ERROR";

export const fetchUnManagedBegin = () => ({
  type: FETCH_UNMANAGED_BEGIN
});

export const fetchUnManagedSuccess = pages => ({
  type: FETCH_UNMANAGED_SUCCESS,
  payload: { pages }
});

export const fetchUnManagedError = error => ({
  type: FETCH_UNMANAGED_ERROR,
  payload: { error }
});
