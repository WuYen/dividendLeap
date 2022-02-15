import React, { useState } from "react";
import { Button, SlideFade, IconButton, Stack, Checkbox, Divider, Input, Box } from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useModal, useMyStock, MyStockAPI } from "../hooks";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

export default function MyStockButton(props) {
  const { stockNo, withText = true, ...rest } = props;
  const [myStock, onAdd, onRemove] = useMyStock(stockNo);
  const { showModal, hideModal } = useModal();
  const isLogin = useSelector(({ member }) => {
    return member.isLogin;
  }, shallowEqual);
  const handleEdit = (e) => {
    console.log("e", e);
    e.stopPropagation();
    showModal({
      title: "儲存 " + stockNo + " 至...",
      content: <EditPanel stockNo={stockNo} hideModal={hideModal} />,
    });
  };

  if (!isLogin) {
    return null;
  }

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

function EditPanel(props) {
  const { stockNo, hideModal } = props;
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
      <Divider />
      <AddPanel dispatch={dispatch} stockNo={stockNo} hideModal={hideModal} />
    </Stack>
  );
}

function AddPanel(props) {
  const { dispatch, stockNo, hideModal } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(false);
  return (
    <>
      {!isEditing && (
        <Button
          colorScheme="teal"
          variant="solid"
          rounded="100"
          size="sm"
          fontSize="sm"
          leftIcon={<AddIcon />}
          _focus={{ outline: "none" }}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          建立新的清單
        </Button>
      )}
      {isEditing && (
        <>
          <Input
            placeholder="清單名稱"
            variant="flushed"
            type="text"
            size="sm"
            onChange={(e) => setType(e.target.value)}
            _focus={{ outline: "none" }}
          />
          <Box width="100%" display={"flex"} justifyContent={"flex-end"}>
            <Button
              colorScheme="teal"
              variant="outline"
              width={"70px"}
              size="sm"
              onClick={() => {
                MyStockAPI.handleAdd(dispatch)(type, stockNo);
                // MyStockAPI.handleFetchMyTypes(dispatch)();
                setIsEditing(false);
                hideModal();
              }}
            >
              完成
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
