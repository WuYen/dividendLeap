import { combineReducers } from "redux";

import schedule from "./Dividend/reducer";
import modalDialog from "./ModalDialog/reducer";
import member from "./Member/reducer";

export default combineReducers({
  schedule,
  modalDialog,
  member,
});
