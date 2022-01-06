import React, { useState, useEffect } from "react";
import { Input, Text, Box, Grid, VStack, StackDivider, Button, Flex } from "@chakra-ui/react";
import stockList from "../../utils/stockList";
import MyStockButton from "../../components/MyStockButton";
import MyListItem from "./MyListItem";

const batchSize = 50;

export default function LeftPanel(props) {
  const { onSelect } = props;
  const [isAdding, setIsAdding] = useState(false);

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch">
      <Box display="flex" justifyContent="space-between">
        <Box>我的清單</Box>
        <button
          onClick={() => {
            setIsAdding((x) => !x);
          }}
        >
          {isAdding ? "返回" : "搜尋"}
        </button>
      </Box>
      {isAdding ? <SearchList onSelect={onSelect} /> : <MyList {...props} />}
    </VStack>
  );
}

const MyList = React.memo((props) => {
  const { myStock = [], kdList = [], selectedStockNo, onSelect, onRemove } = props;

  return myStock.map((item) => (
    <MyListItem
      key={item._id}
      item={item}
      active={selectedStockNo == item.stockNo}
      kd={kdList.find((x) => x.stockNo == `${item.stockNo}`)}
      onSelect={onSelect}
      onRemove={onRemove}
    />
  ));
});

function SearchList(props) {
  const { onSelect } = props;
  const [text, setText] = useState("");
  const [group, setGroup] = useState([]);

  useEffect(() => {
    let options = `${text}`
      ? stockList.filter((x) => {
          return isPureNumber(text) ? x[0].includes(text) : x[1].includes(text);
        })
      : [...stockList];

    let id = null;
    if (options.length) {
      let needInit = true;
      id = setInterval(() => {
        let spliceSize = batchSize;
        if (options.length < batchSize) {
          spliceSize = options.length;
          clearInterval(id);
        }
        setGroup((x) => {
          return needInit ? [options.splice(0, spliceSize)] : [...x, options.splice(0, spliceSize)];
        });
        needInit = false;
      }, 100);
    }

    return () => {
      clearInterval(id);
    };
  }, [text]);

  return (
    <>
      <Input placeholder="查詢" type="search" size="md" onChange={(e) => setText(e.target.value)} />
      <div style={{ overflowY: "auto", marginTop: "16px" }}>
        {group.map((list, index) => {
          return <ListGroup key={index} list={list} onSelect={onSelect} />;
        })}
      </div>
    </>
  );
}

const ListGroup = React.memo((props) => {
  const { list, onSelect } = props;

  return list.map((item) => {
    return <ListItem key={item[0]} item={item} onSelect={onSelect} />;
  });
});

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
