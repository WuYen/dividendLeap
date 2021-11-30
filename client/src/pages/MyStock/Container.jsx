import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, VStack, StackDivider } from "@chakra-ui/react";
import useRouter from "../../hooks/useRouter";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Content, { Container as ContentWrapper } from "./Content";
import AutoComplete from "./AutoComplete";
import MyListItem from "./MyListItem";
import { MyStockAPI, MyStockAction } from "../../hooks/useMyStock";

export default function Container(props) {
  const [{ stockNo: selectedStockNo }, history] = useRouter();
  const myStock = useSelector((state) => state.member.myStock, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    !selectedStockNo && myStock.length && history.push(`/my/stock/${myStock[0].stockNo}`);
  }, []);

  const handleAdd = useCallback(
    (stockNo) => {
      if (myStock.find((x) => x.stockNo == stockNo) == null) {
        MyStockAPI.add(stockNo).then((res) => {
          res.success && dispatch(MyStockAction.addMyStockSuccess(res.data));
        });
      }
    },
    [myStock]
  );

  const handleRemove = useCallback((id) => {
    MyStockAPI.remove(id).then((res) => {
      res.success && dispatch(MyStockAction.removeMyStockSuccess(res.data));
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
