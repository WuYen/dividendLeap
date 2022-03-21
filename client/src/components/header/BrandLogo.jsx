import React from "react";
import { Text, Link, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function BrandLogo(props) {
  return (
    <Text
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      fontWeight="800"
      color={useColorModeValue("teal.600", "white")}
    >
      <Link
        as={RouterLink}
        _hover={{
          textDecoration: "none",
        }}
        to={{
          pathname: "/",
        }}
      >
        STOCK
      </Link>
    </Text>
  );
}
