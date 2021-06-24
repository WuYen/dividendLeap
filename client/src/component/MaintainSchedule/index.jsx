import React from "react";

import { Box } from "@chakra-ui/react";
//import { LinkIcon } from "@chakra-ui/icons";

import List from "./List";
import Form from "./Form";

function MaintainSchedule(props) {
  return (
    <Box d="flex" w="100%">
      <Box w="50%" h="80vh" maxHeight="80vh" overflowY="scroll" p="4">
        <List />
      </Box>
      <Box w="50%" p="4">
        <Form />
      </Box>
    </Box>
  );
}

export default MaintainSchedule;
