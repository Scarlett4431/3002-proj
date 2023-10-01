import { combineReducers } from "redux";
import auth from "./auth";
import board from "./board";
import boards from "./boards";

export default combineReducers({ auth, boards, board });;