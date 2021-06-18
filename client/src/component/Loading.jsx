import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

function Loading(props) {
  return (
    <Center h="82vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Center>
  );
}

export default Loading;
