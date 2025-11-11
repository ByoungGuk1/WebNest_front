import { combineReducers } from "redux";
import mytest from "./mytest";
import user from "./user";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
