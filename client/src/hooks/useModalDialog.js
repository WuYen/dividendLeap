import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModalDialog, closeModalDialog } from "../store/ModalDialog/action";

export default function useModalDialog(props) {
  const dispatch = useDispatch();
  const [isOpen, setState] = useState(false);

  const onClose = () => {
    setState(false);
  };
  const onOpen = () => {
    setState(true);
  };

  var newProps = { isOpen, onClose, onOpen, ...props };

  useEffect(() => {
    dispatch(isOpen ? openModalDialog(newProps) : closeModalDialog(newProps));
  }, [isOpen]);
  return { isOpen, onOpen, onClose };
}
