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

export function fetchUnManagedPages() {
  return dispatch => {
    dispatch(fetchUnManagedBegin());
    return fetch("here the fetch can happen")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchUnManagedSuccess(json.pages));
        return json.products;
      })
      .catch(error => dispatch(fetchUnManagedError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
