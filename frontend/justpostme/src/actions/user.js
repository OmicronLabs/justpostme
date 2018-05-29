//@flow

export const addUser = (userID: string, userToken: string) => ({
  type: "ADD_USER",
  userID,
  userToken
});
