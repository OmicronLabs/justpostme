import { serverDomain } from "../const/serverURL";
import { cleanupText, processText } from "./currentSubmission";

export const FETCH_SCHEDULED_BEGIN = "FETCH_SCHEDULED_BEGIN";
export const FETCH_SCHEDULED_SUCCESS = "FETCH_SCHEDULED_SUCCESS";
export const FETCH_SCHEDULED_ERROR = "FETCH_SCHEDULED_ERROR";
export const DELETE_SCHEDULED = "DELETE_SCHEDULED";

export const fetchScheduledBegin = () => ({
  type: FETCH_SCHEDULED_BEGIN
});

export const fetchScheduledSuccess = submissions => ({
  type: FETCH_SCHEDULED_SUCCESS,
  payload: { submissions }
});

export const fetchScheduledError = error => ({
  type: FETCH_SCHEDULED_ERROR,
  payload: { error }
});

export const deleteScheduledSubmission = id => ({
  type: DELETE_SCHEDULED,
  payload: { id }
});

export function fetchScheduledSubmissions(pageid: string) {
  return dispatch => {
    dispatch(fetchScheduledBegin());

    return fetch(`${serverDomain}/backend/getscheduled?pageid=${pageid}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        const submissions = records.map(record => ({
          rawText: processText(record.postText),
          postText: cleanupText(record.postText),
          databaseId: record.ID,
          pending: record.pending,
          pii: record.pii,
          profanity: record.profanity,
          review: record.review,
          sentiment: record.sentiment,
          timePosted: record.timePosted,
          postHash: record.posthash,
          timeSubmitted: record.timeSubmitted
        }));
        dispatch(fetchScheduledSuccess(submissions));
        return submissions;
      })

      .catch(error => dispatch(fetchScheduledError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
