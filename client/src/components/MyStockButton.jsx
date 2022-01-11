import React from "react";
import { Button, SlideFade, IconButton, Stack, Checkbox } from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useMyStock, MyStockAPI } from "../hooks/useMyStock";
import useModal from "../hooks/useModal";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

export default function MyStockButton(props) {
  const { stockNo, withText = true, ...rest } = props;
  const [myStock, onAdd, onRemove] = useMyStock(stockNo);
  const { showModal, hideModal } = useModal();

  const handleEdit = () => {
    showModal({
      title: "儲存 " + stockNo + " 至...",
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
        onClick={handleEdit}
        {...rest}
      >
        追蹤中
      </Button>
    ) : (
      <IconButton
        colorScheme="teal"
        _focus={{ outline: "none" }}
        rounded="100"
        onClick={handleEdit}
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
        onClick={handleEdit}
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
        onClick={handleEdit}
        size="xs"
        icon={<AddIcon />}
      />
    );
  }
}

function AddToPanel(props) {
  const { stockNo } = props;
  const dispatch = useDispatch();
  const [myStocks, myType] = useSelector(({ member }) => {
    return [member.myStock.filter((x) => x.stockNo == stockNo), member.myType];
  }, shallowEqual);

  return (
    <Stack>
      {myType.map((type) => {
        let myStock = myStocks.find((x) => x.type == type);
        return (
          <Checkbox
            key={type}
            value={type}
            isChecked={!!myStock}
            onChange={(e) => {
              if (e.target.checked) {
                MyStockAPI.handleAdd(dispatch)(type, stockNo);
              } else {
                myStock && MyStockAPI.handleRemove(dispatch)(myStock._id);
              }
            }}
          >
            {type}
          </Checkbox>
        );
      })}
    </Stack>
  );
}
