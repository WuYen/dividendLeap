import React, { useState } from "react";
import { Th } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

function SortTh({ sortBy, setSortBy, ...props }) {
  console.log("SortTh", sortBy);
  const [hover, setHover] = useState(false);
  const isActive = sortBy.field === props.field;
  const Arrow =
    sortBy.type === "asc" ? (
      <ArrowDownIcon
        viewBox="0 0 30 30"
        visibility={hover || isActive ? "visible" : "hidden"}
      />
    ) : (
      <ArrowUpIcon
        viewBox="0 0 30 30"
        visibility={hover || isActive ? "visible" : "hidden"}
      />
    );
  return (
    <Th {...props}>
      <div
        onClick={() => {
          setSortBy((old) => {
            if (old.field === props.field) {
              return {
                field: props.field,
                type: old.type === "asc" ? "desc" : "asc",
              };
            } else {
              return {
                field: props.field,
                type: old.type || "desc",
              };
            }
          });
        }}
        style={{ cursor: "pointer" }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        {props.isNumeric && Arrow}
        {props.children}
        {!props.isNumeric && Arrow}
      </div>
    </Th>
  );
}

export default SortTh;
