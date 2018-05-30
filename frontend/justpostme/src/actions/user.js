//@flow

export const POST_USER_BEGIN = "POST_USER_BEGIN";
export const POST_USER_SUCCESS = "POST_USER_SUCCESS";
export const POST_USER_ERROR = "POST_USER_ERROR";

export const addUser = (userID: string, userToken: string, name: string) => ({
  type: "ADD_USER",
  userID,
  userToken,
  name
});

export const logIn = () => ({
  type: "LOG_IN"
});

export const postUserBegin = () => ({
  type: POST_USER_BEGIN
});

export const postUserSuccess = () => ({
  type: POST_USER_SUCCESS
});

export const postUserError = (error: string) => ({
  type: POST_USER_ERROR,
  payload: { error }
});

export function postUserToServer(user: User) {
  return dispatch => {
    const url = `http://build.mhutti1.eu:6069/backend/user?userid=\"${
      user.userID
    }\"&userAccessToken=\"${user.accessToken}\"ac&email=\"${
      user.email
    }\"&expiresIn=\"${user.expiresIn}\"`;

    dispatch(postUserBegin());
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
        dispatch(postUserSuccess());
        return json.pages;
      })
      .catch(error => dispatch(postUserError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
