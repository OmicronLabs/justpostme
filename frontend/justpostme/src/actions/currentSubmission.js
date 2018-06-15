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
          rawText: processText(record.postText),
          postText: cleanupText(record.postText),
          profanity: record.profanity,
          review: record.review,
          sentiment: record.sentiment,
          timePosted: record.timePosted,
          databaseId: record.ID,
          pageId: record.pageId,
          moderation: record.underModeration
        }))[0];
        dispatch(fetchSubmissionSuccess(submission));
        return submission;
      })
      .catch(error => dispatch(fetchSubmissionError(error)));
  };
}

export const processText = (text: string) => {
  return text.split(/\s+/).map(word => {
    if (word.startsWith("|p|") && word.endsWith("|/p|")) {
      return { word: cleanupText(word), profanity: true };
    } else if (word.startsWith("|i|") && word.endsWith("|/i|")) {
      return { word: cleanupText(word), information: true };
    } else {
      return word;
    }
  });
};

export const cleanupText = (text: string) => {
  return text
    .replace(/\|p\|/g, ``)
    .replace(/\|\/p\|/g, ``)
    .replace(/\|i\|/g, ``)
    .replace(/\|\/i\|/g, ``);
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
