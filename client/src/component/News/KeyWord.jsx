import React from "react";
import { Badge } from "@chakra-ui/react";

export default function KeyWord(props) {
  const { text } = props;
  return (
    <Badge
      px={2}
      py={1}
      fontWeight={"800"}
      fontSize={"medium"}
      color={"teal.600"}
      rounded={"full"}
    >
      #{text}
    </Badge>
  );
}
