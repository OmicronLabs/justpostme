//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const POST_TO_FB_BEGIN = "POST_TO_FB_BEGIN";
export const POST_TO_FB_SUCCESS = "POST_TO_FB_SUCCESS";
export const POST_TO_FB_ERROR = "POST_TO_FB_ERROR";

export const postToFbBegin = () => ({
  type: POST_TO_FB_BEGIN
});

export const postToFbSuccess = () => ({
  type: POST_TO_FB_SUCCESS
});

export const postToFbError = (error: string) => ({
  type: POST_TO_FB_ERROR
});

export function postToFbInstant(postid: number, pageid: string) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/postit?postid=${postid}&pageid=${pageid}`;
    dispatch(postToFbBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(json => {
        dispatch(postToFbSuccess());
        return true;
      })
      .catch(error => dispatch(postToFbError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
