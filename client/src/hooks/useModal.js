import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "../store/ModalDialog/action";

export default function useModal(props) {
  const dispatch = useDispatch();
  const isOpen = useSelector(({ modalDialog }) => {
    return modalDialog.isOpen;
  });

  const handleShow = useCallback((payload) => {
    dispatch(showModal(payload));
  }, []);

  const handleHide = useCallback((payload) => {
    dispatch(hideModal());
  }, []);

  return {
    isOpen,
    showModal: handleShow,
    hideModal: handleHide,
  };
}
