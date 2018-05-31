//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const POST_USER_BEGIN = "POST_USER_BEGIN";
export const POST_USER_SUCCESS = "POST_USER_SUCCESS";
export const POST_USER_ERROR = "POST_USER_ERROR";

export const postUserBegin = () => ({
  type: POST_USER_BEGIN
});

export const postUserSuccess = () => ({
  type: POST_USER_SUCCESS
});

export const postUserError = (error: string) => ({
  type: POST_USER_ERROR
});

export function postUserToServer(user: User) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/user?userid=${
      user.userID
    }&userAccessToken=${user.accessToken}&email=${user.email}&expiresIn=${
      user.expiresIn
    }`;

    dispatch(postUserBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify({
      //   userid: user.userID,
      //   userAccessToken: user.accessToken,
      //   email: user.email,
      //   expiresIn: user.expiresIn
      // })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(postUserSuccess());
        return json.pages;
      })
      .catch(error => dispatch(postUserError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
