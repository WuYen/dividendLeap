import React, { useState, useEffect } from "react";
import { Input, Box, VStack, StackDivider, Flex, Select, Divider } from "@chakra-ui/react";
import stockList from "../../utils/stockList";
import MyStockButton from "../../components/MyStockButton";
import MyListItem from "./MyListItem";
import api from "../../utils/api";
import { LoadingSpinner } from "../../components/Loading";

const batchSize = 50;

export default function LeftPanel(props) {
  const { onSelect, typeList, myType, myStock } = props;
  const [pageInfo, setPageInfo] = useState({
    type: "我的清單",
    isAdding: false,
    list: [], //props.myStock
    typeLoading: false,
  });
  const { isAdding, type, list, typeLoading } = pageInfo;

  useEffect(() => {
    if (myType.find((x) => x == type)) {
      let typeData = myStock.filter((x) => x.type == type);
      setPageInfo((x) => ({ ...x, list: typeData, typeLoading: false }));
    } else if (typeList.find((x) => x == type)) {
      api.get(`/schedule/${type}`).then((response) => {
        console.log("fetch schedule", response);
        const { data, success } = response;
        success && setPageInfo((x) => ({ ...x, list: data.list, typeLoading: false }));
      });
    }
  }, [type, myStock, typeList]);

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch">
      <Box display="flex" justifyContent="space-between">
        <Select
          colorScheme={"teal"}
          width="160px"
          size="sm"
          fontSize="sm"
          rounded="100"
          value={type}
          _focus={{ outline: "none" }}
          onChange={(e) => {
            let value = e.target.value;
            setPageInfo((x) => ({ ...x, type: value, typeLoading: true }));
          }}
        >
          {myType.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}

          {typeList.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </Select>
        <button
          onClick={() => {
            setPageInfo((x) => ({ ...x, isAdding: !x.isAdding }));
          }}
        >
          {isAdding ? "返回" : "搜尋"}
        </button>
      </Box>
      {isAdding ? (
        <SearchList onSelect={onSelect} />
      ) : typeLoading ? (
        <Flex justifyContent={"center"} pt={"10vh"}>
          <LoadingSpinner />
        </Flex>
      ) : (
        <MyList {...props} type={type} data={list} myType={myType} />
      )}
    </VStack>
  );
}

const MyList = React.memo((props) => {
  const { data = [], kdList = [], selectedStockNo, onSelect, onRemove, type, myType } = props;

  return data.map((item) => (
    <MyListItem
      key={item._id}
      type={type}
      enableDelete={myType.find((x) => x == type)}
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
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    let options = `${text}`
      ? stockList.filter((x) => {
          return isPureNumber(text) ? x[0].includes(text) : x[1].includes(text);
        })
      : [...stockList];

    let groupData = [];
    while (groupData.length == 0 || options.length > batchSize) {
      let spliceSize = options.length < batchSize ? options.length : batchSize;
      groupData.push(options.splice(0, spliceSize));
    }
    setGroup(groupData);
    setVisibleIndex(0);
  }, [text]);

  return (
    <>
      <Input placeholder="查詢" type="search" size="sm" onChange={(e) => setText(e.target.value)} />
      <div style={{ overflowY: "auto", marginTop: "16px" }}>
        {group.map((list, index) => {
          if (index <= visibleIndex) {
            return <ListGroup key={index} list={list} onSelect={onSelect} />;
          } else {
            return null;
          }
        })}
      </div>
      <button
        onClick={() => {
          setVisibleIndex((x) => ++x);
        }}
      >
        Load more
      </button>
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
