import React from "react";
import { Button, SlideFade } from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useMyStock } from "../hooks/useMyStock";

export default function MyStockButton(props) {
  const { stockNo } = props;
  const [myStock, onAdd, onRemove] = useMyStock(stockNo);

  if (myStock) {
    return (
      <Button
        colorScheme="teal"
        variant="solid"
        rounded="100"
        size="sm"
        fontSize="sm"
        leftIcon={
          <SlideFade in={true} offsetY="20px">
            <CheckIcon />
          </SlideFade>
        }
        _focus={{ outline: "none" }}
        onClick={onRemove}
      >
        追蹤中
      </Button>
    );
  } else {
    return (
      <Button
        colorScheme="teal"
        variant="outline"
        rounded="100"
        size="sm"
        fontSize="sm"
        leftIcon={<AddIcon />}
        _focus={{ outline: "none" }}
        onClick={onAdd}
      >
        追蹤
      </Button>
    );
  }
}
