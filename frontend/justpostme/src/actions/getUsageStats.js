//@flow
import { serverDomain } from "../const/serverURL";

export const STATS_GET_BEGIN = "STATS_GET_BEGIN";
export const STATS_GET_SUCCESS = "STATS_GET_SUCCESS";
export const STATS_GET_ERROR = "STATS_GET_ERROR";

export const getStatsBegin = () => ({
  type: STATS_GET_BEGIN
});

export const getStatsSuccess = (
  totalSubmissions: number,
  totalPages: number
) => ({
  type: STATS_GET_SUCCESS,
  payload: { totalSubmissions, totalPages }
});

export const getStatsError = (error: string) => ({
  type: STATS_GET_ERROR
});

export function getUsageStats() {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/getstats`;
    dispatch(getStatsBegin());
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(json => {
        //this jsom will have to values
        debugger;
        const totalSubmissions = 0;
        const totalPages = 0;
        dispatch(getStatsSuccess(totalSubmissions, totalPages));
        return true;
      })
      .catch(error => dispatch(getStatsError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
