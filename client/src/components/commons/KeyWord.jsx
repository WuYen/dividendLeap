import React from "react";
import { Badge } from "@chakra-ui/react";

export default function KeyWord(props) {
  const { text, onClick, active = false } = props;
  return (
    <Badge
      px={3}
      py={2}
      mr={2}
      fontWeight={"800"}
      fontSize={"medium"}
      color={active ? "teal.600" : "gray.400"}
      rounded={"full"}
      onClick={onClick}
      cursor="pointer"
    >
      #{text}
    </Badge>
  );
}
