import React, { useEffect, useCallback, useState, useRef } from "react";
import { dataAPI } from "../../utility/config";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { formatDate, tryParseFloat } from "../../utility/formatHelper";
import { LinkIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Loading from "../Common/Loading";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

function List(props) {
  const { editItem, onSetEditItem, render } = props;
  const [schedule, setSchedule] = useState([]);
  const notFetch = useRef(true);

  const callFetchData = useCallback(() => {
    fetchData((data) => {
      notFetch.current = false;
      setSchedule(data.data);
    });
  }, []);

  useEffect(() => {
    callFetchData();
  }, [editItem, render]);

  const handleRemove = (id) => {
    removeData({ id, callback: callFetchData });
  };

  if (schedule.length == 0 && notFetch.current) {
    return <Loading h="100%" />;
  }

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={"md"}>股票</Th>
            <Th fontSize={"md"}>除息日</Th>
            <Th fontSize={"md"} isNumeric>
              現金股利
            </Th>
            <Th fontSize={"md"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedule.length === 0 ? (
            <Tr>
              <Td colSpan="4" textAlign="center" color="gray.400">
                目前沒有資料
              </Td>
            </Tr>
          ) : (
            schedule.map((item, index) => {
              return (
                <Tr key={`${item.stockNo}${index}`}>
                  <Td>{`${item.stockName}(${item.stockNo})`}</Td>
                  <Td>{formatDate(item.date)}</Td>
                  <Td isNumeric>{(+item.cashDividen).toFixed(2)}</Td>
                  <Td isNumeric>
                    <EditButtonGroup
                      onDeleteItem={() => {
                        handleRemove(item._id);
                      }}
                      onSetEditItem={() => {
                        onSetEditItem(item);
                      }}
                    />
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

function fetchData(callback) {
  fetch(`${dataAPI}/schedule/list`)
    .then((res) => res.json())
    .then((data) => {
      console.log("schedule list data", data);
      callback(data);
    });
}

function removeData(props) {
  fetch(`${dataAPI}/schedule/remove`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: props.id }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("remove result", data);
      if (data.success) {
        props.callback(data);
        //getList();
      }
    });
}

export default List;

function EditButtonGroup(props) {
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <ButtonGroup variant="outline" spacing="2">
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
    <ButtonGroup variant="outline" spacing="2">
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

function SortTitle(props) {
  const { sortBy, setSort } = props;
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
    <div
      onClick={() => {
        setSort((old) => {
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
      {props.text}
      {!props.isNumeric && Arrow}
    </div>
  );
}
