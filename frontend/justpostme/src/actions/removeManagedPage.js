//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const REMOVE_FROM_MANAGED_BEGIN = "REMOVE_FROM_MANAGED_BEGIN";
export const REMOVE_FROM_MANAGED_SUCCESS = "REMOVE_FROM_MANAGED_SUCCESS";
export const REMOVE_FROM_MANAGED_ERROR = "REMOVE_FROM_MANAGED_ERROR";

export const removeFromManagedBegin = () => ({
  type: REMOVE_FROM_MANAGED_BEGIN
});

export const removeFromManagedSuccess = () => ({
  type: REMOVE_FROM_MANAGED_SUCCESS
});

export const removeFromManagedError = (error: string) => ({
  type: REMOVE_FROM_MANAGED_ERROR
});

export function removeFromManagedServer(id: number) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/removefrommanaged?pageid=${id}`;
    dispatch(removeFromManagedBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(json => {
        dispatch(removeFromManagedSuccess());
        return true;
      })
      .catch(error => dispatch(removeFromManagedError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
