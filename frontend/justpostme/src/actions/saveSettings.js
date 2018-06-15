//@flow

import { serverDomain } from "../const/serverURL";

export const SAVE_SETTINGS_BEGIN = "SAVE_SETTINGS_BEGIN";
export const SAVE_SETTINGS_SUCCESS = "SAVE_SETTINGS_SUCCESS";
export const SAVE_SETTINGS_ERROR = "SAVE_SETTINGS_ERROR";

export const saveSettingsBegin = () => ({
  type: SAVE_SETTINGS_BEGIN
});

export const saveSettingsSuccess = () => ({
  type: SAVE_SETTINGS_SUCCESS
});

export const saveSettingsError = (error: string) => ({
  type: SAVE_SETTINGS_ERROR
});

export function saveSettings(
  pageId: string,
  preText: string,
  postText: string,
  countFrom: number,
  timeInterval: number
) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/settings`;
    dispatch(saveSettingsBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pageid: pageId,
        queueTime: timeInterval,
        form: preText,
        submission: postText,
        countFrom: countFrom
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(saveSettingsSuccess());
        return true;
      })
      .catch(error => dispatch(saveSettingsError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
