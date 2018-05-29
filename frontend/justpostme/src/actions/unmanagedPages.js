export const FETCH_UNMANAGED_BEGIN = "FETCH_MANAGED_BEGIN";
export const FETCH_UNMANAGED_SUCCESS = "FETCH_MANAGED_SUCCESS";
export const FETCH_UNMANAGED_ERROR = "FETCH_MANAGED_ERROR";

export const fetchUnmanagedBegin = () => ({
  type: FETCH_UNMANAGED_BEGIN
});

export const fetchUnmanagedSuccess = pages => ({
  type: FETCH_UNMANAGED_SUCCESS,
  payload: { pages }
});

export const fetchUnmanagedError = error => ({
  type: FETCH_UNMANAGED_ERROR,
  payload: { error }
});

export function fetchUnmanagedPages() {
  return dispatch => {
    dispatch(fetchUnmanagedBegin());
    return fetch("here the fetch can happen")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchUnmanagedSuccess(json.pages));
        return json.pages;
      })
      .catch(error => dispatch(fetchUnmanagedError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
