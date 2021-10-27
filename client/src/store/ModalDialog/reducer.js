import * as ACTION_TYPES from "./actionType";

export const initialState = {
  enable: false,
  header: "",
  Body: null,
  Footer: null,
};

export default function ModalDialogReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.OPEN_MODALDIALOG:
      return action.payload;
    case ACTION_TYPES.CLOSE_MODALDIALOG:
      const { isOpen, onOpen, onClose } = action.payload;
      return {
        header: null,
        Body: null,
        Footer: null,
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
      };
    default:
      return state;
  }
}
