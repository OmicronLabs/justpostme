//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const ADD_TO_MANAGED_BEGIN = "ADD_TO_MANAGED_BEGIN";
export const ADD_TO_MANAGED_SUCCESS = "ADD_TO_MANAGED_SUCCESS";
export const ADD_TO_MANAGED_ERROR = "ADD_TO_MANAGED_ERROR";

export const addToManagedBegin = () => ({
  type: ADD_TO_MANAGED_BEGIN
});

export const addToManagedSuccess = () => ({
  type: ADD_TO_MANAGED_SUCCESS
});

export const addToManagedError = (error: string) => ({
  type: ADD_TO_MANAGED_ERROR
});

export function addToManagedServer(id: number) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/addtomanaged?pageid=${id}`;
    alert(url);
    dispatch(addToManagedBegin());
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
        dispatch(addToManagedSuccess());
        return true;
      })
      .catch(error => dispatch(addToManagedError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
