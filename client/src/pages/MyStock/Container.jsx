import React, { useCallback, useEffect, useState } from "react";
import { Box, useMediaQuery, Grid, VStack, StackDivider, Text } from "@chakra-ui/react";
import api from "../../utils/api";
import useRouter from "../../hooks/useRouter";

import Content, { Container as ContentWrapper } from "./Content";
import AutoComplete from "./AutoComplete";
import MyListItem from "./MyListItem";

export default function Container(props) {
  // const [over768px] = useMediaQuery("(min-width: 768px)");
  const [myList, setMyList] = useState([]);
  const [{ stockNo: selectedStockNo }, history] = useRouter();

  useEffect(() => {
    fetchList().then((res) => {
      if (res.success) {
        setMyList(res.data.list);
        !selectedStockNo && res.data.list.length && history.push(`/my/stock/${res.data.list[0].stockNo}`);
      }
    });
  }, []);

  // reload content after remove
  // useEffect(() => {
  //   let index = myList.findIndex((x) => x._id === id);
  //   if (index == 0) {
  //     let newStockNo = myList[0] ? myList[0].stockNo : "";
  //     history.push(`/my/stock/${newStockNo}`);
  //   }
  //   if (index > 0) {
  //     history.push(`/my/stock/${myList[index - 1].stockNo}`);
  //   }
  // }, [myList]);

  const handleAdd = useCallback((stockNo) => {
    console.log("handle select", stockNo);
    add(stockNo).then((res) => {
      setMyList(res.data.list);
    });
  }, []);

  const handleRemove = useCallback((id) => {
    console.log("handle remove", id);
    remove(id).then((res) => {
      setMyList(res.data.list);
    });
  }, []);

  const handleSelect = useCallback((stockNo) => {
    history.push(`/my/stock/${stockNo}`);
  }, []);

  return (
    <Box p="4" width="100%">
      <Grid templateColumns="280px 4fr" gap={4}>
        <Box>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <Box>
              我的清單
              {myList.map((item) => (
                <MyListItem
                  key={item._id}
                  item={item}
                  selectedStockNo={selectedStockNo}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                />
              ))}
            </Box>
            <Box>
              <AutoComplete onAdd={handleAdd} />
            </Box>
          </VStack>
        </Box>
        <Box>
          {selectedStockNo && (
            <ContentWrapper stockNo={selectedStockNo}>
              <Content />
            </ContentWrapper>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

function fetchList() {
  return api.get(`/my/list`).then((data) => {
    console.log("fetchList result", data);
    return data;
  });
}

function add(stockNo) {
  return api.get(`/my/list/add/${stockNo}`).then((data) => {
    console.log("add result", data);
    return data;
  });
}

function remove(id) {
  const payload = JSON.stringify({ id: id });
  return api.post(`/my/list/remove`, payload).then((data) => {
    console.log("remove result", data);
    return data;
  });
}
