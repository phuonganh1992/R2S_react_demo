import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers, createStore } from "redux";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  auth: authReducer,
  loadingBar: loadingBarReducer,
});

const store = createStore(rootReducer);

export default store;
