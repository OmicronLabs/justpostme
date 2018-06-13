//@flow
export const SNACKBAR_SHOW = "SNACKBAR_SHOW";
export const SNACKBAR_HIDE = "SNACKBAR_HIDE";

export const showSnackbar = (message: string) => ({
  type: SNACKBAR_SHOW,
  payload: { message }
});

export const hideSnackbar = () => ({
  type: SNACKBAR_HIDE
});

export const snackbarNotify = (mesage: string) => {
  dispatch => {
    setTimeout(() => dispatch(showSnackbar(mesage)), 3000);
    dispatch(hideSnackbar());
  };
};
