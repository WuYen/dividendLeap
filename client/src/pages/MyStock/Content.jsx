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

export default React.memo(function Content(props) {
  const { stockNo } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMount = useRef();

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    isMount.current && setLoading(true);
    api.get(`/forcast/${stockNo}`).then((response) => {
      if (response.success) {
        setData(response.data);
        setTimeout(() => {
          isMount.current && setLoading(false);
        }, 300);
      }
    });
  }, [stockNo]);

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
});

function Forecast(props) {
  const { data, stockNo } = props;

  return (
    <Box>
      <Box>
        {data.baseInfo[0]} {data.baseInfo[1]}
      </Box>
      <Grid templateColumns="auto 480px" gap={4}>
        <Box>
          <Box>
            <ComputeStock key={stockNo} eps={data.eps[0]} />
            目前股價: {data.dayInfo.price} ({formatHelper.formatDate(data.dayInfo.date)})
          </Box>
          <InfoPanel data={data.eps} stockDetail={data.stockDetail} />
          <EpsList data={[data.eps[0]]} />
          <br />
          <EpsList data={data.eps.slice(1)} isHistory={true} />
          <br />
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
