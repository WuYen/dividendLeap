import React from "react";
import { Tr } from "@chakra-ui/react";

function SortTr({ sortBy, setSortBy, ...props }) {
  const enhanceChildren = React.Children.map(props.children, (child) =>
    React.cloneElement(child, { sortBy, setSortBy })
  );
  return <Tr {...props}>{enhanceChildren}</Tr>;
}

export default SortTr;
