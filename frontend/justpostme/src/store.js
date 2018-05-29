//@flow

import { combineReducers } from "redux";
import user from "./reducers/user";
import managedPages from "./reducers/managedPages";
import unmanagedPages from "./reducers/unmanagedPages";

export default combineReducers({
  user,
  managedPages,
  unmanagedPages
});
