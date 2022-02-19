import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import * as MyStock from "../stock/Content";

export default function DividendDetail(props) {
  const params = useParams();
  const { stockNo } = params;
  const [myData, myLoading] = MyStock.useFetchData(stockNo);

  return (
    <Box m="4" color="gray.600">
      <MyStock.Content stockNo={stockNo} data={myData} loading={myLoading} />
    </Box>
  );
}
