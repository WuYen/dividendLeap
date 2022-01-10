import React, { useCallback } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { hideModal } from "../store/ModalDialog/action";

function ModalContainer(props) {
  const { title = "", isOpen, content, footer } = props;

  const handleClose = useCallback(() => {
    props.hideModal();
  }, []);

  return (
    <Modal colorScheme={"teal"} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton _focus={{ outline: "none" }} />
        <ModalBody>{React.isValidElement(content) && content}</ModalBody>
        <ModalFooter>{React.isValidElement(footer) && footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const mapStateToProps = ({ modalDialog }) => ({ ...modalDialog });
const mapActionToProps = { hideModal };
export default connect(mapStateToProps, mapActionToProps)(ModalContainer);
