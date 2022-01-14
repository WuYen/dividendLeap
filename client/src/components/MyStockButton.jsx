import React, { useState, useCallback } from "react";
import { Button, SlideFade, IconButton, Stack, Checkbox, Divider, Input, Box } from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useMyStock, MyStockAPI } from "../hooks/useMyStock";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { showModal, hideModal } from "../store/ModalDialog/action";

export default function MyStockButton(props) {
  const { stockNo, withText = true, ...rest } = props;
  const [myStocks, myType, isLogin] = useSelector(({ member }) => {
    return [member.myStock.filter((x) => x.stockNo == stockNo), member.myType, member.isLogin];
  }, shallowEqual);
  const dispatch = useDispatch();
  const handleHide = useCallback(() => {
    dispatch(hideModal());
  }, []);

  const handleEdit = () => {
    let payload = {
      title: "儲存 " + stockNo + " 至...",
      content: (
        <EditPanel stockNo={stockNo} onHideModal={handleHide} dispatch={dispatch} myStocks={myStocks} myType={myType} />
      ),
    };
    dispatch(showModal(payload));
  };
  if (!isLogin) {
    return null;
  }
  if (myStocks?.length > 0) {
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
  const { stockNo, onHideModal, dispatch, myStocks, myType } = props;

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
      <AddPanel dispatch={dispatch} stockNo={stockNo} onHideModal={onHideModal} />
    </Stack>
  );
}

function AddPanel(props) {
  const { dispatch, stockNo, onHideModal } = props;
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
                setIsEditing(false);
                onHideModal();
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
