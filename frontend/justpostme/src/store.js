//@flow

import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

import user from "./reducers/user";
import userMeta from "./reducers/userMeta";
import managedPages from "./reducers/managedPages";
import unmanagedPages from "./reducers/unmanagedPages";
import addManagedPage from "./reducers/addManagedPage";
import postSubmission from "./reducers/postSubmission";
import removeManagedPage from "./reducers/removeManagedPage";
import pendingSubmissions from "./reducers/pendingSubmissions";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userMeta"]
};

const rootReducer = combineReducers({
  user,
  userMeta,
  managedPages,
  unmanagedPages,
  addManagedPage,
  postSubmission,
  removeManagedPage,
  pendingSubmissions
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
