import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";

export default function BackButton(props) {
  return (
    props.variant === "sm" && (
      <Box p={0}>
        <Link
          color="teal.500"
          as={RouterLink}
          _hover={{
            textDecoration: "none",
            color: "teal.800",
          }}
          to={{
            pathname: `/`,
          }}
        >
          回列表
          <LinkIcon mx="4px" viewBox="0 0 30 30" />
        </Link>
      </Box>
    )
  );
}
