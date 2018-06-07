import { serverDomain } from "../const/serverURL";
import altImage from "../media/page_alt_img.png";

export const FETCH_SUBMISSION_BEGIN = "FETCH_SUBMISSION_BEGIN";
export const FETCH_SUBMISSION_SUCCESS = "FETCH_SUBMISSION_SUCCESS";
export const FETCH_SUBMISSION_ERROR = "FETCH_SUBMISSION_ERROR";

export const fetchSubmissionBegin = () => ({
  type: FETCH_SUBMISSION_BEGIN
});

export const fetchSubmissionSuccess = submission => ({
  type: FETCH_SUBMISSION_SUCCESS,
  payload: { submission }
});

export const fetchSubmissionError = error => ({
  type: FETCH_SUBMISSION_ERROR,
  payload: { error }
});

export function fetchCurrentSubmission(submissionHash: string) {
  return dispatch => {
    dispatch(fetchSubmissionBegin());
    return fetch(`${serverDomain}/backend/post?postHash=${submissionHash}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        debugger;
        const page = records.map(record => ({
          name: record.name,
          databaseId: record.ID,
          pageID: record.pageId,
          pendingPosts: record.pendingPosts,
          scheduledPosts: record.scheduledPosts
        }))[0];
        dispatch(fetchSubmissionSuccess(page));
        return page;
      })
      .catch(error => dispatch(fetchSubmissionError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
