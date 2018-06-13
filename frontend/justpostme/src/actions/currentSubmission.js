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
        const submission = records.map(record => ({
          pending: record.pending,
          pii: record.pii,
          postText: record.postText,
          profanity: record.profanity,
          review: record.review,
          sentiment: record.sentiment,
          timePosted: record.timePosted,
          databaseId: record.ID,
          pageId: record.pageId
        }))[0];
        dispatch(fetchSubmissionSuccess(submission));
        return submission;
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
