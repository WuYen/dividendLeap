import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModalDialog, closeModalDialog } from "../stores/ModalDialog/action";

export default function useModalDialog(props) {
  const dispatch = useDispatch();
  const { data, isOpen } = props;

  const onClose = () => {
    //setState(false);
  };
  const onOpen = () => {
    //setState(true);
  };

  var newProps = { ...props, isOpen, onClose, onOpen };

  useEffect(() => {
    dispatch(isOpen ? openModalDialog(newProps) : closeModalDialog(newProps));
  }, [isOpen]);
  return { isOpen, onOpen, onClose };
}
