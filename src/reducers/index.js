import { combineReducers } from "redux";
import user from "./user";
import lists from "./lists";
import destinations from "./destinations";
import holidays from "./holidays";
import countries from "./countries";

export default combineReducers({
  user,
  lists,
  destinations,
  holidays,
  countries
});
