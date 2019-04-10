import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import * as TinyPng from "./TinyPng";

export default function configureStore() {
  const reducers = {
    tinyPng: TinyPng.reducer
  };

  const middleware = [thunk];

  const rootReducer = combineReducers({
    ...reducers
  });

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
