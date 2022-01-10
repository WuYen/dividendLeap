import React from "react";
import { Button, SlideFade, IconButton, Stack, Checkbox } from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useMyStock } from "../hooks/useMyStock";
import useModal from "../hooks/useModal";

export default function MyStockButton(props) {
  const { stockNo, withText = true, ...rest } = props;
  const [myStock, onAdd, onRemove] = useMyStock(stockNo);
  const { isOpen, showModal, hideModal } = useModal();

  const handleAdd = () => {
    showModal({
      title: "儲存至...",
      content: <AddToPanel />,
      // footer: (
      //   <>
      //     <button
      //       onClick={() => {
      //         hideModal();
      //       }}
      //     >
      //       +建立新的清單
      //     </button>
      //   </>
      // ),
    });
  };

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
        onClick={handleAdd}
        {...rest}
      >
        {withText && "追蹤"}
      </Button>
    ) : (
      <IconButton colorScheme="teal" variant="outline" rounded="100" onClick={handleAdd} size="xs" icon={<AddIcon />} />
    );
  }
}

function AddToPanel(props) {
  return (
    <Stack>
      <Checkbox value="我的清單">我的清單</Checkbox>
    </Stack>
  );
}
