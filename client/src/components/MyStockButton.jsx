import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import useMyStock from "../hooks/useMyStock";

export default function MyStockButton(props) {
  const { stockNo } = props;
  const { myStock, handleAdd, handleRemove } = useMyStock(stockNo);

  if (myStock) {
    //teal background
    return <div onClick={handleRemove}>追蹤中</div>;
  } else {
    //white background、teal font
    return <div onClick={handleAdd}>+追蹤</div>;
  }
}
