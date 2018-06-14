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
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const record = json.recordset[0];
        const totalSubmissions = record.numberOfPosts;
        const totalPages = record.numberOfPages;
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
