import * as ACTION_TYPES from "./actionType";

export const initialState = {
  enable: false,
  header: "",
  Body: null,
  Footer: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_TYPES.OPEN_MODALDIALOG:
      return payload;
    case ACTION_TYPES.CLOSE_MODALDIALOG:
      const { isOpen, onOpen, onClose } = payload;
      return {
        header: null,
        Body: null,
        Footer: null,
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
      };
    case ACTION_TYPES.SHOW_MODAL:
      return { ...state, ...payload, isOpen: true };
    case ACTION_TYPES.HIDE_MODAL:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}
