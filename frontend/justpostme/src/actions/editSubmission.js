//@flow

import { serverDomain } from "../const/serverURL";

export const EDIT_SUBMISSION_BEGIN = "EDIT_SUBMISSION_BEGIN";
export const EDIT_SUBMISSION_SUCCESS = "EDIT_SUBMISSION_SUCCESS";
export const EDIT_SUBMISSION_ERROR = "EDIT_SUBMISSION_ERROR";

export const editSubmissionBegin = () => ({
  type: EDIT_SUBMISSION_BEGIN
});

export const editSubmissionSuccess = () => ({
  type: EDIT_SUBMISSION_SUCCESS
});

export const editSubmissionError = (error: string) => ({
  type: EDIT_SUBMISSION_ERROR
});

export function editSubmission(hash: string, text: string) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/updatepost`;
    dispatch(editSubmissionBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postHash: hash,
        postText: text
      })
    })
      .then(handleErrors)
      .then(json => {
        dispatch(editSubmissionSuccess());
        return true;
      })
      .catch(error => dispatch(editSubmissionError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
