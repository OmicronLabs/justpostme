import { serverDomain } from "../const/serverURL";
import altImage from "../media/page_alt_img.png";

export const FETCH_MANAGED_BEGIN = "FETCH_MANAGED_BEGIN";
export const FETCH_MANAGED_SUCCESS = "FETCH_MANAGED_SUCCESS";
export const FETCH_MANAGED_ERROR = "FETCH_MANAGED_ERROR";

export const fetchManagedBegin = () => ({
  type: FETCH_MANAGED_BEGIN
});

export const fetchManagedSuccess = pages => ({
  type: FETCH_MANAGED_SUCCESS,
  payload: { pages }
});

export const fetchManagedError = error => ({
  type: FETCH_MANAGED_ERROR,
  payload: { error }
});

export function fetchManagedPages(userID: string) {
  return dispatch => {
    dispatch(fetchManagedBegin());
    return fetch(`${serverDomain}/backend/managedpages?id=${userID}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        const pages = records.map(record => ({
          name: record.name,
          databaseId: record.ID,
          pageID: record.pageId,
          pendingPosts: record.pendingPosts,
          scheduledPosts: record.scheduledPosts,
          backgroundImgURL: `https://graph.facebook.com/${
            record.pageId
          }/picture?height=500`
        }));
        dispatch(fetchManagedSuccess(pages));
        return pages;
      })
      .catch(error => dispatch(fetchManagedError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
