import { serverDomain } from "../const/serverURL";
import { processText, cleanupText } from "../functions/util";

export const FETCH_MODERATION_BEGIN = "FETCH_MODERATION_BEGIN";
export const FETCH_MODERATION_SUCCESS = "FETCH_MODERATION_SUCCESS";
export const FETCH_MODERATION_ERROR = "FETCH_MODERATION_ERROR";
export const DELETE_MODERATION = "DELETE_MODERATION";

export const fetchModerationBegin = () => ({
  type: FETCH_MODERATION_BEGIN
});

export const fetchModerationSuccess = submissions => ({
  type: FETCH_MODERATION_SUCCESS,
  payload: { submissions }
});

export const fetchModerationError = error => ({
  type: FETCH_MODERATION_ERROR,
  payload: { error }
});

export const deleteModerationSubmission = id => ({
  type: DELETE_MODERATION,
  payload: { id }
});

export function fetchModerationSubmissions(pageid: string) {
  return dispatch => {
    dispatch(fetchModerationBegin());

    return fetch(`${serverDomain}/backend/getmoderating?pageid=${pageid}`)
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
        dispatch(fetchModerationSuccess(submissions));
        return submissions;
      })

      .catch(error => dispatch(fetchModerationError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
