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

export function showModal(payload) {
  return {
    type: ACTION_TYPES.SHOW_MODAL,
    payload,
  };
}

export function hideModal(payload) {
  return {
    type: ACTION_TYPES.HIDE_MODAL,
    payload,
  };
}
