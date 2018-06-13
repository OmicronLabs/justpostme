//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const ADD_MODERATION_BEGIN = "ADD_MODERATION_BEGIN";
export const ADD_MODERATION_SUCCESS = "ADD_MODERATION_SUCCESS";
export const ADD_MODERATION_ERROR = "ADD_MODERATION_ERROR";

export const addModerationSubmissionBegin = () => ({
  type: ADD_MODERATION_BEGIN
});

export const addModerationSubmissionSuccess = () => ({
  type: ADD_MODERATION_SUCCESS
});

export const addModerationSubmissionError = (error: string) => ({
  type: ADD_MODERATION_ERROR
});

export function addModerationSubmission(postid: string) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/setmoderating?postid=${postid}`;
    dispatch(addModerationSubmissionBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(json => {
        dispatch(addModerationSubmissionSuccess());
        return true;
      })
      .catch(error => dispatch(addModerationSubmissionError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
