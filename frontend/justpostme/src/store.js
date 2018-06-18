//@flow

import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

import user from "./reducers/user";
import addEmail from "./reducers/addEmail";
import snackbar from "./reducers/snackbar";
import userMeta from "./reducers/userMeta";
import submitForm from "./reducers/submitForm";
import getSettings from "./reducers/getSettings";
import postComment from "./reducers/postComment";
import currentPage from "./reducers/currentPage";
import saveSettings from "./reducers/saveSettings";
import managedPages from "./reducers/managedPages";
import fetchComments from "./reducers/fetchComments";
import getUsageStats from "./reducers/getUsageStats";
import unmanagedPages from "./reducers/unmanagedPages";
import addManagedPage from "./reducers/addManagedPage";
import editSubmission from "./reducers/editSubmission";
import postSubmission from "./reducers/postSubmission";
import addToModeration from "./reducers/addToModeration";
import removeSubmission from "./reducers/removeSubmission";
import removeManagedPage from "./reducers/removeManagedPage";
import currentSubmission from "./reducers/currentSubmission";
import pendingSubmissions from "./reducers/pendingSubmissions";
import scheduleSubmission from "./reducers/scheduleSubmission";
import scheduledSubmissions from "./reducers/scheduledSubmissions";
import moderationSubmissions from "./reducers/moderationSubmissions";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userMeta"]
};

const rootReducer = combineReducers({
  user,
  addEmail,
  userMeta,
  snackbar,
  submitForm,
  postComment,
  getSettings,
  currentPage,
  saveSettings,
  managedPages,
  fetchComments,
  getUsageStats,
  unmanagedPages,
  addManagedPage,
  editSubmission,
  postSubmission,
  addToModeration,
  removeSubmission,
  currentSubmission,
  removeManagedPage,
  pendingSubmissions,
  scheduleSubmission,
  scheduledSubmissions,
  moderationSubmissions
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    // allow for redux dev tool extension in chrome
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
