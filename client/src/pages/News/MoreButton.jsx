import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";

export default function MoreButton({ showMore, showText = true, ...rest }) {
  const text = showMore ? "MORE" : "LESS";

  const Icon = showMore ? ChevronDownIcon : ChevronUpIcon;

  return (
    <Button
      h={showText ? "10" : "6"}
      mt="3"
      display="flex"
      variant="unstyled"
      flexDirection="column"
      _focus={{ outline: "none" }}
      _hover={{ backgroundColor: "gray.300" }}
      {...rest}
    >
      {showText && <Text>{text}</Text>}
      <Icon />
    </Button>
  );
}
