import { combineReducers } from "redux";
import Address from "./Address/index"
import Mail from "./EmailValide"

const rootReducer = combineReducers({
  Address,
  Mail
});

export default rootReducer;
