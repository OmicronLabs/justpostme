//@flow
export const addUser = (userID: string, userToken: string, name: string) => ({
  type: "ADD_USER",
  userID,
  userToken,
  name
});

export const logIn = () => ({
  type: "LOG_IN"
});
