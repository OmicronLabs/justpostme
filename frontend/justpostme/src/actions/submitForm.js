//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const SUBMIT_FORM_BEGIN = "SUBMIT_FORM_BEGIN";
export const SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS";
export const SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR";

export const submitFormBegin = () => ({
  type: SUBMIT_FORM_BEGIN
});

export const submitFormSuccess = postId => ({
  type: SUBMIT_FORM_SUCCESS,
  payload: { postId }
});

export const submitFormError = (error: string) => ({
  type: SUBMIT_FORM_ERROR
});

export function submitForm(pageid: string, text: string) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/createpost`;
    dispatch(submitFormBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pageid: pageid,
        postText: text
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(submitFormSuccess(json.posthash));
        alert(json.posthash);
        return json.posthash;
      })
      .catch(error => dispatch(submitFormError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
