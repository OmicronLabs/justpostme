//@flow

import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import user from "./reducers/user";
import managedPages from "./reducers/managedPages";
import unmanagedPages from "./reducers/unmanagedPages";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const rootReducer = combineReducers({
  user,
  managedPages,
  unmanagedPages
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
