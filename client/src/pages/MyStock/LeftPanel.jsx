import React, { useState } from "react";
import { Input, Text, Box, Grid, VStack, StackDivider, Button, Flex } from "@chakra-ui/react";
import stockList from "../../utils/stockList";
import MyStockButton from "../../components/MyStockButton";
import MyListItem from "./MyListItem";
import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function LeftPanel(props) {
  const { onRemove, onSelect, myStock, kdList, selectedStockNo } = props;
  const [isAdding, setIsAdding] = useState(false);

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
  }, [myStock, kdList, selectedStockNo]);

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch">
      <Box display="flex" justifyContent="space-between">
        <Box>我的清單</Box>
        <button
          onClick={() => {
            setIsAdding((x) => !x);
          }}
        >
          {isAdding ? "完成" : "搜尋"}
        </button>
      </Box>
      {isAdding ? <SearchList onSelect={onSelect} /> : myStockList}
    </VStack>
  );
}

function SearchList(props) {
  const { onSelect } = props;
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const options = stockList.filter((x) => {
      if (text) {
        return isPureNumber(text) ? x[0].includes(text) : x[1].includes(text);
      } else {
        return true;
      }
    });

    let id = setInterval(() => {
      setList((x) => [...x, ...options.splice(0, 80)]);
      if (options.length < 80) {
        clearInterval(id);
        setList((x) => [...x, ...options]);
      }
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [text]);

  return (
    <>
      <Input placeholder="查詢" type="search" size="md" onChange={(e) => setText(e.target.value)} />
      <div style={{ overflowY: "auto", marginTop: "16px" }}>
        {list.map((item) => {
          return <ListItem key={item[0]} item={item} onSelect={onSelect} />;
        })}
      </div>
    </>
  );
}
const ListItem = React.memo((props) => {
  const { item, onSelect } = props;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} py={2}>
      <Box
        onClick={() => {
          onSelect(item[0]);
        }}
        width="100%"
        cursor="pointer"
        _hover={{ backgroundColor: "gray.100" }}
      >
        {item[0]} {item[1]}
      </Box>
      <Box>
        <MyStockButton stockNo={item[0]} withText={false} />
      </Box>
    </Flex>
  );
});

function isPureNumber(value) {
  return value.replace(/\D/g, "").length > 0;
}
