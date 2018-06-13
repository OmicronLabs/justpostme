//@flow

import { serverDomain } from "../const/serverURL";
import type { User } from "../containers/welcomePage/WelcomePageContainer";

export const POST_COMMENT_BEGIN = "POST_COMMENT_BEGIN";
export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";
export const POST_COMMENT_ERROR = "POST_COMMENT_ERROR";

export const postCommentBegin = () => ({
  type: POST_COMMENT_BEGIN
});

export const postCommentSuccess = () => ({
  type: POST_COMMENT_SUCCESS
});

export const postCommentError = (error: string) => ({
  type: POST_COMMENT_ERROR
});

export function postComment(postHash: string, text: string, admin: boolean) {
  return (dispatch: Function) => {
    const url = `${serverDomain}/backend/postcomment`;
    dispatch(postCommentBegin());
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        posthash: postHash,
        text: text,
        byadmin: admin
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(postCommentSuccess());
        return json.posthash;
      })
      .catch(error => dispatch(postCommentError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
