import React, { Fragment, useEffect, useRef, useState } from "react";
import { Box, Grid, Button } from "@chakra-ui/react";
import { formatHelper, ForecastAPI } from "../../utilities";
import { LoadingSpinner } from "../commons/Loading";
import { FundamentalData } from "./TradingViewWidget";
import { FinMindNews2, useFinMindData } from "../news/FinMindNews";
import DataList from "../news/DataList";
import InfoPanel from "./InfoPanel";
import EpsList from "./EpsList";
import RevenueList from "./RevenueList";
import ComputeStock from "./ComputeStock";
import MyStockButton from "../stock/MyStockButton";
import StockFrame from "./StockFrame";
import Chart from "./Chart";
import { useIsMounted } from "../../hooks";

export function useFetchData(stockNo) {
  const [page, setPage] = useState({ list: [], loading: true });
  const isMount = useIsMounted();

  useEffect(() => {
    isMount.current && setPage((x) => ({ ...x, loading: true }));
    ForecastAPI.getData(stockNo).then((response) => {
      if (response.success) {
        isMount.current && setPage({ list: response.data, isLoaded: false });
      }
    });
  }, [stockNo]);

  return [page.list, page.loading];
}

export function Container(props) {
  const { stockNo } = props;
  const [data, loading] = useFetchData(stockNo);

  return React.cloneElement(props.children, {
    stockNo,
    data,
    loading,
  });
}

export function Content(props) {
  const { stockNo, data, loading } = props;

  return (
    <Box h="100%">
      {loading ? (
        <Box className="loading-container" textAlign="center" pt="10vh">
          <LoadingSpinner />
        </Box>
      ) : (
        <Forecast key={stockNo} stockNo={stockNo} data={data} />
      )}
    </Box>
  );
}

export default React.memo(Content);

function Forecast(props) {
  const { data, stockNo } = props;
  const [showStockFrame, setShowStockFrame] = useState(false);
  return (
    <Box>
      <Box display="flex" alignItems="center" position="relative">
        <Box color="teal">
          {data.baseInfo.stockNo} {data.baseInfo.stockName}
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
        <OutLinkButtons stockNo={stockNo} />
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
            <InfoPanel data={data.eps} revenue={data.revenue} stockDetail={data.stockDetail} />
            <EpsList data={data.eps} />
            <RevenueList data={data.revenue} />
          </Box>
          <Box>
            <FundamentalData stockNo={stockNo} />
            <Box h="2" />
            <FinMindNews2
              fetchData={{ useFetch: useFinMindData, params: stockNo }}
              loading={DataList.Loading}
              list={DataList.List}
            />
          </Box>
        </Grid>
      </Box>

      <Box display={showStockFrame ? "" : "none"}>
        <StockFrame stockNo={stockNo} />
      </Box>
    </Box>
  );
}

function OutLinkButtons(props) {
  const { stockNo } = props;
  const list = [
    { text: "Yahoo", url: `https://tw.stock.yahoo.com/quote/${stockNo}/revenue` },
    { text: "Cmoney", url: `https://www.cmoney.tw/forum/stock/${stockNo}` },
    { text: "Fugle", url: `https://www.fugle.tw/ai/${stockNo}` },
    { text: "財報狗", url: `https://statementdog.com/analysis/${stockNo}` },
    { text: "GoodInfo", url: `https://goodinfo.tw/tw/StockDetail.asp?STOCK_ID=${stockNo}` },
  ];
  return list.map((info) => {
    return (
      <Fragment key={info.text}>
        <Button
          colorScheme="teal"
          variant="outline"
          rounded="100"
          size="sm"
          fontSize="sm"
          _focus={{ outline: "none" }}
          onClick={() => {
            window.open(info.url, "_blank").focus();
          }}
        >
          {info.text}
        </Button>
        <Box w="2" />
      </Fragment>
    );
  });
}
