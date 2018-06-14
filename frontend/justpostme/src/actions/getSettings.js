//@flow
import { serverDomain } from "../const/serverURL";

export const GET_SETTINGS_BEGIN = "GET_SETTINGS_BEGIN";
export const GET_SETTINGS_SUCCESS = "GET_SETTINGS_SUCCESS";
export const GET_SETTINGS_ERROR = "GET_SETTINGS_ERROR";

export const getSettingsBegin = () => ({
  type: GET_SETTINGS_BEGIN
});

export const getSettingsSuccess = (
  preText: string,
  postText: string,
  countFrom: number,
  timeInterval: number
) => ({
  type: GET_SETTINGS_SUCCESS,
  payload: { preText, postText, countFrom, timeInterval }
});

export const getSettingsError = error => ({
  type: GET_SETTINGS_ERROR,
  payload: { error }
});

export function getSettings(pageid: string) {
  return dispatch => {
    dispatch(getSettingsBegin());

    return fetch(`${serverDomain}/backend/getsettings?pageid=${pageid}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        const preText = json.recordset[0].preText;
        const postText = json.recordset[0].postText;
        const countFrom = json.recordset[0].countFrom;
        const timeInterval = json.recordset[0].queueTime;
        dispatch(
          getSettingsSuccess(preText, postText, countFrom, timeInterval)
        );
        return true;
      })

      .catch(error => dispatch(getSettingsError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
