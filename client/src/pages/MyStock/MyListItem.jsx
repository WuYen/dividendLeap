import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import stockList from "../../utils/stockList";

export default function MyListItem(props) {
  const { item, selectedStockNo, onSelect, onRemove } = props;
  const name = `${item.stockNo} ${stockList.find((x) => x[0] == item.stockNo)[1]}`;
  return (
    <Grid templateColumns="1fr auto" gap={2} alignItems="center">
      <Text
        color={selectedStockNo == item.stockNo ? "teal.500" : "grey.500"}
        onClick={() => {
          onSelect(item.stockNo);
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
          window.confirm("確認刪除: " + name) == true && onRemove(item._id);
        }}
        textAlign="end"
      >
        刪除
      </Text>
    </Grid>
  );
}
