import { serverDomain } from "../const/serverURL";
import altImage from "../media/page_alt_img.png";

export const FETCH_UNMANAGED_BEGIN = "FETCH_UNMANAGED_BEGIN";
export const FETCH_UNMANAGED_SUCCESS = "FETCH_UNMANAGED_SUCCESS";
export const FETCH_UNMANAGED_ERROR = "FETCH_UNMANAGED_ERROR";

export const fetchUnmanagedBegin = () => ({
  type: FETCH_UNMANAGED_BEGIN
});

export const fetchUnmanagedSuccess = pages => ({
  type: FETCH_UNMANAGED_SUCCESS,
  payload: { pages }
});

export const fetchUnmanagedError = error => ({
  type: FETCH_UNMANAGED_ERROR,
  payload: { error }
});

export function fetchUnmanagedPages(userID: string) {
  return dispatch => {
    dispatch(fetchUnmanagedBegin());
    return fetch(`${serverDomain}/backend/unmanagedpages?id=${userID}`)
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
          backgroundImgURL: altImage
        }));
        dispatch(fetchUnmanagedSuccess(pages));
        return pages;
      })
      .catch(error => dispatch(fetchUnmanagedError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
