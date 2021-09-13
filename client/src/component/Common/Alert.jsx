import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";

// props = {
//     status: String, //error, success, warning, and info
//     title: String,
//     description: String,
//     show: Boolean,
//     closeBtnFunc: Fuction,
// }

function AlertComponent(props) {
  return (
    <Collapse in={props.open} animateOpacity>
      <Alert status={props.status}>
        <AlertIcon />
        <AlertTitle mr={2}>{props.title}</AlertTitle>
        <AlertDescription>{props.description}</AlertDescription>
        {!!props.closeFunc ? (
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => {
              props.closeFunc({});
            }}
          />
        ) : (
          <></>
        )}
      </Alert>
    </Collapse>
  );
}

export default AlertComponent;
