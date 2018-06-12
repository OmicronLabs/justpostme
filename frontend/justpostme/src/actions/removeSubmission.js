//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const REMOVE_SUBMISSION_BEGIN = "REMOVE_SUBMISSION_BEGIN";
export const REMOVE_SUBMISSION_SUCCESS = "REMOVE_SUBMISSION_SUCCESS";
export const REMOVE_SUBMISSION_ERROR = "REMOVE_SUBMISSION_ERROR";

export const removeSubmissionBegin = () => ({
  type: REMOVE_SUBMISSION_BEGIN
});

export const removeSubmissionSuccess = () => ({
  type: REMOVE_SUBMISSION_SUCCESS
});

export const removeSubmissionError = (error: string) => ({
  type: REMOVE_SUBMISSION_ERROR
});

export function removeSubmission(postid: string) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/removepost?postid=${postid}`;
    dispatch(removeSubmissionBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(json => {
        dispatch(removeSubmissionSuccess());
        return true;
      })
      .catch(error => dispatch(removeSubmissionError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
