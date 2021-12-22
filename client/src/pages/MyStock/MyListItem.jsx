import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import stockList from "../../utils/stockList";

export default function MyListItem(props) {
  const { item, active, onSelect, onRemove, kd } = props;
  const info = stockList.find((x) => x[0] == item.stockNo);
  const name = `${item.stockNo} ${info[1]}`;
  console.log("MyListItem", item.stockNo, kd);
  return (
    info && (
      <Grid templateColumns="1fr auto" gap={2} alignItems="center">
        <Box
          color={active ? "teal.500" : "grey.500"}
          onClick={() => {
            onSelect(item.stockNo);
          }}
          width="100%"
          cursor="pointer"
          _hover={{ backgroundColor: "gray.100" }}
          paddingY="1"
        >
          <Text>{name}</Text>
          <Box display="flex" justifyContent="space-between">
            {kd && <Box style={{ color: kd.k > kd.d ? "red" : "balck", width: "50px" }}>{`K:${kd.k}`}</Box>}
            {kd && <Box style={{ color: kd.d > kd.k ? "red" : "balck", width: "50px" }}>{`D:${kd.d}`}</Box>}
          </Box>
        </Box>
        <Text
          paddingY="1"
          cursor="pointer"
          _hover={{ backgroundColor: "red.100" }}
          onClick={() => {
            window.confirm("確認刪除: " + name) == true && onRemove(item._id);
          }}
          textAlign="end"
        >
          刪除
        </Text>
      </Grid>
    )
  );
}
