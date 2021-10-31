import React, { useCallback, useEffect, useState } from "react";
import { Box, useMediaQuery, Input, Grid, VStack, StackDivider, Text } from "@chakra-ui/react";
import api from "../../utils/api";
import stockList from "../../utils/stockList";
import { useParams, useHistory } from "react-router-dom";

import Content from "./Content";

export default function Container(props) {
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const [myList, setMyList] = useState([]);
  const { stockNo } = useParams();
  const history = useHistory();
  console.log("stockNo", stockNo);
  useEffect(() => {
    fetchList().then((res) => {
      if (res.success) {
        setMyList(res.data.list);
        !stockNo && res.data.list.length && history.push(`/my/stock/${res.data.list[0].stockNo}`);
      }
    });
  }, []);

  const handleSelect = useCallback((stockNo) => {
    console.log("handle select", stockNo);
    add(stockNo).then((res) => {
      setMyList(res.data.list);
    });
  }, []);

  const handleRemove = useCallback(
    (id) => {
      console.log("handle remove", id);
      remove(id)
        .then((res) => {
          // let index = myList.findIndex((x) => x._id === id);
          // if (index == 0) {
          //   let newStockNo = myList[0] ? myList[0].stockNo : "";
          //   history.push(`/my/stock/${newStockNo}`);
          // }
          // if (index > 0) {
          //   history.push(`/my/stock/${myList[index - 1].stockNo}`);
          // }
          return res.data.list;
        })
        .then((list) => {
          setMyList(list);
        });
    },
    [myList]
  );

  return (
    <Box p="4" width="100%">
      <Grid templateColumns="280px 4fr" gap={4}>
        <Box>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <Box>
              我的清單
              {myList.map((item) => {
                return (
                  <MyListItem
                    key={item._id}
                    stockNo={stockNo}
                    history={history}
                    item={item}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </Box>
            <Box>
              <AutoComplete handleSelect={handleSelect} />
            </Box>
          </VStack>
        </Box>
        <Box>{stockNo && <Content stockNo={stockNo} />}</Box>
      </Grid>
    </Box>
  );
}

function MyListItem(props) {
  const { history, item, stockNo, handleRemove } = props;
  const name = `${item.stockNo} ${stockList.find((x) => x[0] == item.stockNo)[1]}`;
  return (
    <Grid templateColumns="1fr auto" gap={2} alignItems="center">
      <Text
        color={stockNo == item.stockNo ? "teal.500" : "grey.500"}
        onClick={() => {
          history.push(`/my/stock/${item.stockNo}`);
        }}
        width="100%"
        cursor="pointer"
        _hover={{ backgroundColor: "gray.100" }}
        paddingY="1"
      >
        {name}
      </Text>
      <Text
        paddingY="1"
        cursor="pointer"
        _hover={{ backgroundColor: "red.100" }}
        onClick={() => {
          var r = window.confirm("確認刪除: " + name);
          if (r == true) {
            handleRemove(item._id);
          }
        }}
        textAlign="end"
      >
        刪除
      </Text>
    </Grid>
  );
}

function ListItem(props) {
  const { item, handleSelect } = props;
  return (
    <Text
      onClick={() => {
        handleSelect(item[0]);
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

function fetchList() {
  return api.get(`/mystock/list`).then((data) => {
    console.log("fetchList result", data);
    return data;
  });
}

function add(stockNo) {
  return api.get(`/mystock/add/${stockNo}`).then((data) => {
    console.log("add result", data);
    return data;
  });
}

function remove(id) {
  const payload = JSON.stringify({ id: id });
  return api.post(`/mystock/remove`, payload).then((data) => {
    console.log("remove result", data);
    return data;
  });
}

function isPureNumber(value) {
  return value.replace(/\D/g, "").length > 0;
}

function AutoComplete(props) {
  const { handleSelect } = props;
  const [text, setText] = useState("");

  const options = stockList.filter((x) => {
    if (!text) {
      return true;
    } else if (isPureNumber(text)) {
      return x[0].includes(text);
    } else {
      return x[1].includes(text);
    }
  });

  return (
    <>
      <Input placeholder="查詢" type="search" size="md" onChange={(e) => setText(e.target.value)} />
      <div style={{ height: "400px", overflowY: "auto", marginTop: "16px" }}>
        {options.map((item) => {
          return <ListItem key={item[0]} item={item} handleSelect={handleSelect} />;
        })}
      </div>
    </>
  );
}
