import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Box, HStack, Input, SliderThumb, SliderFilledTrack, SliderTrack, Slider, Grid } from "@chakra-ui/react";
import DataList from "../../pages/News/DataList";
import api from "../../utils/api";
import { formatHelper } from "../../utils";
import { LoadingSpinner } from "../../components/Loading";
import { FundamentalData } from "../../components/TradingViewWidget";

export default React.memo(function Content(props) {
  const { stockNo } = props;
  return (
    <Box h="100%">
      <Forecast key={stockNo} stockNo={stockNo} />
    </Box>
  );
});

function Forecast(props) {
  const { stockNo } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/forcast/${stockNo}`).then((response) => {
      console.log("data", response);
      if (response.success) {
        setData(response.data);
      }
    });
  }, [stockNo]);

  return data ? (
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
          <br />
          <EpsList data={data.eps} />
        </Box>
        <Box>
          <FundamentalData stockNo={stockNo} />
        </Box>
      </Grid>
    </Box>
  ) : (
    <Box h="88vh" className="loading-container" textAlign="center">
      <LoadingSpinner mt="50%" />
    </Box>
  );
}

function ComputeStock(props) {
  const { eps } = props;
  const { estimateDividend, rate, totalEps } = eps;
  const [ratio, setRatio] = useState(5); //目標殖利率
  const [dividend, setDividend] = useState(totalEps); //total eps estimate
  const [distributeRate, setDistributeRate] = useState(rate); //分配率
  // 股票殖利率 = 現金股利 ÷ 股價
  const estimatePayout = (dividend * distributeRate).toFixed(2) || "";
  const estimatePrice = (ratio && (estimatePayout / (ratio * 0.01)).toFixed(2)) || "";
  return (
    <div>
      計算股價:
      <br />
      目標殖利率 {ratio} %
      <Slider
        aria-label="slider-ex-1"
        colorScheme="teal"
        defaultValue={5}
        min={0}
        max={10}
        step={0.5}
        onChange={(val) => setRatio(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <br />
      預計股利 = EPS * 分配率
      <HStack spacing={3}>
        <Input type="number" size="md" value={estimatePayout} readOnly={true} style={{ pointerEvents: "none" }} />
        <div>=</div>
        <Input
          type="number"
          size="md"
          value={dividend}
          onChange={(e) => {
            //現金股利
            setDividend(e.target.value);
          }}
        />
        <div>*</div>
        <Input
          type="number"
          size="md"
          step="0.01"
          value={distributeRate}
          onChange={(e) => {
            //分配率
            setDistributeRate(e.target.value);
          }}
        />
      </HStack>
      <br />
      買進股價 {estimatePrice}
    </div>
  );
}

function EpsList(props) {
  const { data } = props;

  return (
    <>
      <HStack spacing={3}>
        <div>年度</div>
        <HStack>
          <div style={{ width: "50px", textAlign: "right" }}>Q1</div>
          <div style={{ width: "50px", textAlign: "right" }}>Q2</div>
          <div style={{ width: "50px", textAlign: "right" }}>Q3</div>
          <div style={{ width: "50px", textAlign: "right" }}>Q4</div>
          <div style={{ width: "50px", textAlign: "right" }}>EPS</div>
        </HStack>
        <div style={{ width: "80px", textAlign: "right" }}>預估股利</div>
        <div style={{ width: "80px", textAlign: "right" }}>分配率</div>
      </HStack>
      {data.map((d, index) => {
        const { cashDividend, estimateDividend, q, rate, totalEps, year } = d;
        return (
          <Fragment key={index}>
            <HStack spacing={3}>
              <div>{year}</div>
              <EPS eps={totalEps} quarter={q} />
              <div style={{ width: "80px", textAlign: "right" }}>{cashDividend ? cashDividend : estimateDividend}</div>
              <div style={{ width: "80px", textAlign: "right" }}>{rate}</div>
            </HStack>
            {index == 0 && (
              <>
                <br />
                <HStack spacing={3}>
                  <div>年度</div>
                  <HStack>
                    <div style={{ width: "50px", textAlign: "right" }}>Q1</div>
                    <div style={{ width: "50px", textAlign: "right" }}>Q2</div>
                    <div style={{ width: "50px", textAlign: "right" }}>Q3</div>
                    <div style={{ width: "50px", textAlign: "right" }}>Q4</div>
                    <div style={{ width: "50px", textAlign: "right" }}>EPS</div>
                  </HStack>
                  <div style={{ width: "80px", textAlign: "right" }}>現金股利</div>
                  <div style={{ width: "80px", textAlign: "right" }}>分配率</div>
                </HStack>
              </>
            )}
          </Fragment>
        );
      })}
    </>
  );
}

function EPS(props) {
  const { eps, quarter } = props;
  return (
    <HStack>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[0]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[1]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[2]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[3]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{eps}</div>
    </HStack>
  );
}

{
  /* <DataList.Container keyWord={stockNo} search={true} loading={0} list={1}>
        <DataList.Loading />
        <DataList.List />
      </DataList.Container> */
}
