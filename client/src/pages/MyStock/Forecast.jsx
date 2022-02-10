import React, { useState } from "react";
import { Box, Grid, Button } from "@chakra-ui/react";
import { formatHelper } from "../../utils";
import { FundamentalData } from "../../components/TradingViewWidget";
import { FinMindNews2, useFinMindData } from "../News/FinMindNews";
import DataList from "../News/DataList";
import InfoPanel from "./InfoPanel";
import EpsList from "./EpsList";
import ComputeStock from "./ComputeStock";
import MyStockButton from "../../components/MyStockButton";
import StockFrame from "../DividendDetail/StockFrame";
import Chart from "./Chart";

export default function Forecast(props) {
  const { data, stockNo } = props;
  const [showStockFrame, setShowStockFrame] = useState(false);
  return (
    <Box>
      <Box display="flex" alignItems="center" position="relative">
        <Box color="teal">
          {data.baseInfo[0]} {data.baseInfo[1]}
        </Box>
        <Box w="2" />
        <MyStockButton stockNo={stockNo} />
        <Box w="2" />
        <Button
          colorScheme="teal"
          variant="outline"
          rounded="100"
          size="sm"
          fontSize="sm"
          _focus={{ outline: "none" }}
          onClick={() => {
            setShowStockFrame((x) => !x);
          }}
        >
          顯示切換
        </Button>
        <Box w="2" />
        <Button
          colorScheme="teal"
          variant="outline"
          rounded="100"
          size="sm"
          fontSize="sm"
          _focus={{ outline: "none" }}
          onClick={() => {
            const url = `https://tw.stock.yahoo.com/quote/${stockNo}/revenue`;
            window.open(url, "_blank").focus();
          }}
        >
          Yahoo
        </Button>
      </Box>
      <Box display={showStockFrame ? "none" : ""}>
        <Grid templateColumns="auto 460px" gap={4}>
          <Box>
            <Chart stockNo={stockNo} />
            <Box h="2" />
            <Box>
              <ComputeStock key={stockNo} eps={data.eps[0]} />
              目前股價: {data.dayInfo.price} ({formatHelper.formatDate(data.dayInfo.date)})
            </Box>
            <InfoPanel data={data.eps} stockDetail={data.stockDetail} />
            <EpsList data={[data.eps[0]]} />
            <Box h="2" />
            <EpsList data={data.eps.slice(1)} isHistory={true} />
            <Box h="2" />
            <FinMindNews2
              fetchData={{ useFetch: useFinMindData, params: stockNo }}
              loading={DataList.Loading}
              list={DataList.List}
            />
          </Box>
          <Box>
            <FundamentalData stockNo={stockNo} />
          </Box>
        </Grid>
      </Box>

      <Box display={showStockFrame ? "" : "none"}>
        <StockFrame stockNo={stockNo} />
      </Box>
    </Box>
  );
}