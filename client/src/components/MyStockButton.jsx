import React from "react";
import { Button, SlideFade, IconButton, Stack, Checkbox } from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useMyStock } from "../hooks/useMyStock";
import useModal from "../hooks/useModal";
import { shallowEqual, useSelector } from "react-redux";

export default function MyStockButton(props) {
  const { stockNo, withText = true, ...rest } = props;
  const [myStock, onAdd, onRemove] = useMyStock(stockNo);
  const { showModal, hideModal } = useModal();

  const handleAdd = () => {
    showModal({
      title: "儲存至...",
      content: <AddToPanel stockNo={stockNo} />,
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
      <IconButton
        colorScheme="teal"
        _focus={{ outline: "none" }}
        rounded="100"
        onClick={onRemove}
        size="xs"
        icon={<CheckIcon />}
      />
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
      <IconButton
        colorScheme="teal"
        _focus={{ outline: "none" }}
        variant="outline"
        rounded="100"
        onClick={handleAdd}
        size="xs"
        icon={<AddIcon />}
      />
    );
  }
}

function AddToPanel(props) {
  const [, onAdd, onRemove] = useMyStock(props.stockNo);
  const myType = useSelector(({ member }) => {
    return member.myType;
  }, shallowEqual);
  return (
    <Stack>
      {myType.map((type) => {
        return (
          <Checkbox
            key={type}
            value={type}
            onChange={(e) => {
              e.target.checked ? onAdd(type) : onRemove();
            }}
          >
            {type}
          </Checkbox>
        );
      })}
    </Stack>
  );
}
