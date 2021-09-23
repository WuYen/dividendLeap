import React, { useState } from "react";
import { formatDate } from "../../utils/formatHelper";
import { Tr, Td, IconButton, ButtonGroup } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

function DataRow(props) {
  const { _id, stockNo, stockName, date, cashDividen, service } = props;
  return (
    <Tr>
      <Td>{`${stockName}(${stockNo})`}</Td>
      <Td>{formatDate(date)}</Td>
      <Td isNumeric>{(+cashDividen).toFixed(2)}</Td>
      <Td isNumeric>
        <EditButtonGroup
          disable={props.isEditing}
          onDeleteItem={() => {
            service.onRemoveData(_id);
          }}
          onSetEditItem={() => {
            service.onSetEditItem({
              stockNo,
              stockName,
              stockNo,
              date,
              cashDividen,
              _id,
            });
          }}
        />
      </Td>
    </Tr>
  );
}

export default React.memo(DataRow);

function EditButtonGroup(props) {
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <ButtonGroup variant="outline" spacing="2" isDisabled={props.disable}>
      <IconButton
        aria-label="Confirm"
        _focus={{ outline: "none" }}
        icon={<CheckIcon color="teal.500" />}
        onClick={() => {
          console.log("Confirm delete");
          props.onDeleteItem();
        }}
      />
      <IconButton
        aria-label="Cancel"
        _focus={{ outline: "none" }}
        icon={<CloseIcon color="pink.400" />}
        onClick={() => {
          setConfirm(false);
        }}
      />
    </ButtonGroup>
  ) : (
    <ButtonGroup variant="outline" spacing="2" isDisabled={props.disable}>
      <IconButton
        aria-label="Edit"
        _focus={{ outline: "none" }}
        icon={<EditIcon color="teal.500" />}
        onClick={props.onSetEditItem}
      />
      <IconButton
        aria-label="Delete"
        _focus={{ outline: "none" }}
        icon={<DeleteIcon color="pink.400" />}
        onClick={() => {
          setConfirm(true);
        }}
      />
    </ButtonGroup>
  );
}
