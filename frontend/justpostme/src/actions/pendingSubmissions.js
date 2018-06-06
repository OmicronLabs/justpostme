import { serverDomain } from "../const/serverURL";

export const FETCH_PENDING_BEGIN = "FETCH_PENDING_BEGIN";
export const FETCH_PENDING_SUCCESS = "FETCH_PENDING_SUCCESS";
export const FETCH_PENDING_ERROR = "FETCH_PENDING_ERROR";
export const DELETE_PENDING = "DELETE_PENDING";

export const fetchPendingBegin = () => ({
  type: FETCH_PENDING_BEGIN
});

export const fetchPendingSuccess = submissions => ({
  type: FETCH_PENDING_SUCCESS,
  payload: { submissions }
});

export const fetchPendingError = error => ({
  type: FETCH_PENDING_ERROR,
  payload: { error }
});

export const deletePendingSubmission = id => ({
  type: DELETE_PENDING,
  payload: { id }
});

export function fetchPendingSubmissions(pageid: string) {
  return dispatch => {
    dispatch(fetchPendingBegin());

    return fetch(`${serverDomain}/backend/getpending?pageid=${pageid}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        const submissions = records.map(record => ({
          name: record.postText,
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
