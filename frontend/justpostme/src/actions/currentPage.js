import { serverDomain } from "../const/serverURL";
import altImage from "../media/page_alt_img.png";

export const FETCH_PAGE_BEGIN = "FETCH_PAGE_BEGIN";
export const FETCH_PAGE_SUCCESS = "FETCH_PAGE_SUCCESS";
export const FETCH_PAGE_ERROR = "FETCH_PAGE_ERROR";

export const fetchPageBegin = () => ({
  type: FETCH_PAGE_BEGIN
});

export const fetchPageSuccess = page => ({
  type: FETCH_PAGE_SUCCESS,
  payload: { page }
});

export const fetchPageError = error => ({
  type: FETCH_PAGE_ERROR,
  payload: { error }
});

export function fetchCurrentPage(pageid: string) {
  return dispatch => {
    dispatch(fetchPageBegin());
    return fetch(`${serverDomain}/backend/page?pageid=${pageid}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const records = json.recordset;
        debugger;
        const page = records.map(record => ({
          name: record.name,
          databaseId: record.ID,
          pageID: record.pageId,
          pendingPosts: record.pendingPosts,
          scheduledPosts: record.scheduledPosts,
          backgroundImgURL: altImage
        }))[0];
        dispatch(fetchPageSuccess(page));
        return page;
      })
      .catch(error => dispatch(fetchPageError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
