//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const SCHEDULE_TO_FB_BEGIN = "SCHEDULE_TO_FB_BEGIN";
export const SCHEDULE_TO_FB_SUCCESS = "SCHEDULE_TO_FB_SUCCESS";
export const SCHEDULE_TO_FB_ERROR = "SCHEDULE_TO_FB_ERROR";

export const scheduleToFbBegin = () => ({
  type: SCHEDULE_TO_FB_BEGIN
});

export const scheduleToFbSuccess = () => ({
  type: SCHEDULE_TO_FB_SUCCESS
});

export const scheduleToFbError = (error: string) => ({
  type: SCHEDULE_TO_FB_ERROR
});

export function schedulePostToFb(postid: number, pageid: string) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/schedulepost?postid=${postid}&pageid=${pageid}`;
    dispatch(scheduleToFbBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(json => {
        dispatch(scheduleToFbSuccess());
        return true;
      })
      .catch(error => dispatch(scheduleToFbError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
