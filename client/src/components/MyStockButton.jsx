import React from "react";
import { Button, SlideFade, IconButton } from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useMyStock } from "../hooks/useMyStock";

export default function MyStockButton(props) {
  const { stockNo, withText = true, ...rest } = props;
  const [myStock, onAdd, onRemove] = useMyStock(stockNo);

  if (myStock) {
    return withText ? (
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
        {...rest}
      >
        追蹤中
      </Button>
    ) : (
      <IconButton colorScheme="teal" rounded="100" onClick={onRemove} size="xs" icon={<CheckIcon />} />
    );
  } else {
    return withText ? (
      <Button
        colorScheme="teal"
        variant="outline"
        rounded="100"
        size="sm"
        fontSize="sm"
        leftIcon={<AddIcon />}
        _focus={{ outline: "none" }}
        onClick={onAdd}
        {...rest}
      >
        {withText && "追蹤"}
      </Button>
    ) : (
      <IconButton colorScheme="teal" rounded="100" onClick={onAdd} size="xs" icon={<AddIcon />} />
    );
  }
}
