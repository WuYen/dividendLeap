import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";

export default FormikModalDialog;

function FormikModalDialog(props) {
  const {
    header,
    Body,
    Footer,
    isOpen,
    onOpen,
    onClose,
    formProps: { initialValues, validationSchema, submitHandler } = {},
    ...rest
  } = useSelector(({ modalDialog }) => modalDialog);
  const formProps = {
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      submitHandler(values, actions);
    },
  };

  return (
    <Formik {...formProps}>
      {(props) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {header && <ModalHeader>{header}</ModalHeader>}
            <ModalCloseButton />
            <ModalBody>{Body && <Body />}</ModalBody>
            <ModalFooter>{Footer && <Footer />}</ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
}
