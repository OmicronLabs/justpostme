//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const POST_EMAIL_BEGIN = "POST_EMAIL_BEGIN";
export const POST_EMAIL_SUCCESS = "POST_EMAIL_SUCCESS";
export const POST_EMAIL_ERROR = "POST_EMAIL_ERROR";

export const postEmailBegin = () => ({
  type: POST_EMAIL_BEGIN
});

export const postEmailSuccess = () => ({
  type: POST_EMAIL_SUCCESS
});

export const postEmailError = (error: string) => ({
  type: POST_EMAIL_ERROR
});

export function postEmail(postHash: string, email: string) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/setemail?email=${email}&posthash=${postHash}`;
    dispatch(postEmailBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(json => {
        dispatch(postEmailSuccess());
        return true;
      })
      .catch(error => dispatch(postEmailError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
