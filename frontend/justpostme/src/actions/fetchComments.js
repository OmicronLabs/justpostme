import { serverDomain } from "../const/serverURL";

export const FETCH_COMMENTS_BEGIN = "FETCH_COMMENTS_BEGIN";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR";
export const ADD_COMMENT = "ADD_COMMENT";

export const fetchCommentsBegin = () => ({
  type: FETCH_COMMENTS_BEGIN
});

export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { comments }
});

export const fetchCommentsError = error => ({
  type: FETCH_COMMENTS_ERROR,
  payload: { error }
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: { comment }
});

export function fetchComments(pageid: string) {
  return dispatch => {
    dispatch(fetchCommentsBegin());

    return fetch(`${serverDomain}/backend/getpending?pageid=${pageid}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        debugger;
        const comments = records.map(record => ({}));
        dispatch(fetchCommentsSuccess(comments));
        return comments;
      })

      .catch(error => dispatch(fetchCommentsError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
