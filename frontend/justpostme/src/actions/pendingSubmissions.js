import { serverDomain } from "../const/serverURL";

export const FETCH_PENDING_BEGIN = "FETCH_PENDING_BEGIN";
export const FETCH_PENDING_SUCCESS = "FETCH_PENDING_SUCCESS";
export const FETCH_PENDING_ERROR = "FETCH_PENDING_ERROR";

export const fetchPendingBegin = () => ({
  type: FETCH_PENDING_BEGIN
});

export const fetchPendingSuccess = pending => ({
  type: FETCH_PENDING_SUCCESS,
  payload: { pending }
});

export const fetchPendingError = error => ({
  type: FETCH_PENDING_ERROR,
  payload: { error }
});

export function fetchPendingSubmissions(userID: string) {
  return dispatch => {
    dispatch(fetchPendingBegin());
    return fetch(`${serverDomain}/backend/managedpages?id=${userID}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        debugger;
        const submissions = records.map(record => ({
          name: record.name,
          databaseId: record.ID
        }));
        dispatch(fetchPendingSuccess(submissions));
        return submissions;
      })
      .catch(error => dispatch(fetchPendingError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
