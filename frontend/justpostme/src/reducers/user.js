const user = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER":
      return [
        ...state,
        {
          id: action.userID,
          text: action.userToken
        }
      ];

    default:
      return state;
  }
};

export default user;
