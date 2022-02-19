import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "../stores/ModalDialog/action";

export default function useModal(props) {
  const dispatch = useDispatch();

  //大量使用有效能問題
  // const isOpen = useSelector(({ modalDialog }) => {
  //   return modalDialog.isOpen;
  // });

  const handleShow = useCallback((payload) => {
    dispatch(showModal(payload));
  }, []);

  const handleHide = useCallback((payload) => {
    dispatch(hideModal());
  }, []);

  return {
    showModal: handleShow,
    hideModal: handleHide,
  };
}
