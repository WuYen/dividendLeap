import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, VStack, StackDivider } from "@chakra-ui/react";
import useRouter from "../../hooks/useRouter";

import Content, { Container as ContentWrapper } from "./Content";
import AutoComplete from "./AutoComplete";
import MyListItem from "./MyListItem";
import { useMyStocks } from "../../hooks/useMyStock";
import api from "../../utils/api";
export default function Container(props) {
  const [{ stockNo: selectedStockNo }, history] = useRouter();
  const [myStock, handleAdd, handleRemove] = useMyStocks();
  const [kdList, setKDList] = useState([]);
  useEffect(() => {
    !selectedStockNo && myStock.length && history.push(`/my/stock/${myStock[0].stockNo}`);
    api.get(`/forecast/kd/list`).then((response) => {
      console.log("fetch kd list result", response);
      const { data, success } = response;
      success && setKDList(data);
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
              {myStock?.map((item) => (
                <MyListItem
                  key={item._id}
                  item={item}
                  active={selectedStockNo == item.stockNo}
                  kd={kdList.find((x) => x.stockNo == `${item.stockNo}`)}
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
