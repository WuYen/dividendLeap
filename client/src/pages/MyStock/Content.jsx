import React, { useEffect, useRef, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { api, formatHelper } from "../../utils";
import { LoadingSpinner } from "../../components/Loading";
import { FundamentalData } from "../../components/TradingViewWidget";
import { FinMindNews2, useFinMindData } from "../News/FinMindNews";
import DataList from "../News/DataList";
import InfoPanel from "./InfoPanel";
import EpsList from "./EpsList";
import ComputeStock from "./ComputeStock";
import MyStockButton from "../../components/MyStockButton";

export function useFetchData(stockNo) {
  const [page, setPage] = useState({ list: [], loading: true });
  const isMount = useRef();

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    isMount.current && setPage((x) => ({ ...x, loading: true }));
    api.get(`/forecast/${stockNo}`).then((response) => {
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
  const { stockNo, data, loading, myStock } = props;

  return (
    <Box h="100%">
      {loading ? (
        <Box h="100vh" className="loading-container" textAlign="center">
          <LoadingSpinner mb="50%" />
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

  return (
    <Box>
      <Box>
        {data.baseInfo[0]} {data.baseInfo[1]}
        <MyStockButton stockNo={stockNo} />
      </Box>
      <Grid templateColumns="auto 460px" gap={4}>
        <Box>
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
  );
}
