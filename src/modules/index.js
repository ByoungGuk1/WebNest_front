import { combineReducers } from "redux";
import mytest from "./mytest";
import user from "./user";

const rootReducer = combineReducers({
  mytest,
  user,
});

export default rootReducer;
