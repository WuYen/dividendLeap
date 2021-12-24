import React, { useState } from "react";
import { Input, Text, Box, Grid, VStack, StackDivider } from "@chakra-ui/react";
import stockList from "../../utils/stockList";
import MyListItem from "./MyListItem";
import { useMemo } from "react";

export default function LeftPanel(props) {
  const { onAdd, onRemove, onSelect, myStock, kdList, selectedStockNo } = props;
  const [text, setText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const options = stockList.filter((x) => {
    if (!text) {
      return true;
    } else if (isPureNumber(text)) {
      return x[0].includes(text);
    } else {
      return x[1].includes(text);
    }
  });

  const myStockList = useMemo(() => {
    return myStock?.map((item) => (
      <MyListItem
        key={item._id}
        item={item}
        active={selectedStockNo == item.stockNo}
        kd={kdList.find((x) => x.stockNo == `${item.stockNo}`)}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    ));
  }, [myStock, kdList]);

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch">
      <Box display="flex" justifyContent="space-between">
        <Box>我的清單</Box>
        <button
          onClick={() => {
            setIsAdding((x) => !x);
            isAdding && setText("");
          }}
        >
          {isAdding ? "完成" : "新增"}
        </button>
      </Box>
      {isAdding ? (
        <>
          <Input placeholder="查詢" type="search" size="md" onChange={(e) => setText(e.target.value)} />
          <div style={{ overflowY: "auto", marginTop: "16px" }}>
            {options.map((item) => {
              return <ListItem key={item[0]} item={item} onAdd={onAdd} />;
            })}
          </div>
        </>
      ) : (
        myStockList
      )}
    </VStack>
  );
}

function ListItem(props) {
  const { item, onAdd } = props;
  return (
    <Text
      onClick={() => {
        onAdd(item[0]);
      }}
      width="100%"
      cursor="pointer"
      _hover={{ backgroundColor: "gray.100" }}
      paddingY="1"
    >
      {item[0]} {item[1]}
    </Text>
  );
}

function isPureNumber(value) {
  return value.replace(/\D/g, "").length > 0;
}
