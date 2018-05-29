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

export function fetchManagedPages() {
  return dispatch => {
    dispatch(fetchManagedBegin());
    return fetch("here the fetch can happen")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchManagedSuccess(json.pages));
        return json.products;
      })
      .catch(error => dispatch(fetchManagedError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
