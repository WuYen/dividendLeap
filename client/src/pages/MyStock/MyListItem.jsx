import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import stockList from "../../utils/stockList";

export default function MyListItem(props) {
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
