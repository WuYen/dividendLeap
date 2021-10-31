import * as ACTION_TYPES from "./actionType";

export function openModalDialog(payload) {
  return {
    type: ACTION_TYPES.OPEN_MODALDIALOG,
    payload,
  };
}

export function closeModalDialog(payload) {
  return {
    type: ACTION_TYPES.CLOSE_MODALDIALOG,
    payload,
  };
}
