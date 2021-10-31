import { combineReducers } from "redux";

import schedule from "./Dividend/reducer";
import modalDialog from "./ModalDialog/reducer";

export default combineReducers({
  schedule,
  modalDialog,
});
