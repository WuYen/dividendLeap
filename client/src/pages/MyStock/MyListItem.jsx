import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import stockList from "../../utils/stockList";

export default function MyListItem(props) {
  const { item, active, onSelect, onRemove } = props;
  const info = stockList.find((x) => x[0] == item.stockNo);
  const name = `${item.stockNo} ${info[1]}`;
  return (
    info && (
      <Grid templateColumns="1fr auto" gap={2} alignItems="center">
        <Text
          color={active ? "teal.500" : "grey.500"}
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
    )
  );
}
