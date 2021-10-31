import React, { useCallback, useEffect, useState } from "react";
import { Box, HStack, Input, SliderThumb, SliderFilledTrack, SliderTrack, Slider, Divider } from "@chakra-ui/react";
import DataList from "../../pages/News/DataList";
import api from "../../utils/api";
import { formatHelper } from "../../utils";

export default function Content(props) {
  const { stockNo } = props;
  return (
    <Box>
      <Forecast stockNo={stockNo} />
      {/* <DataList.Container keyWord={stockNo} search={true} loading={0} list={1}>
        <DataList.Loading />
        <DataList.List />
      </DataList.Container> */}
    </Box>
  );
}

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

  return (
    data && (
      <Box>
        <Box>
          {data.baseInfo[0]} {data.baseInfo[1]}
        </Box>
        <Box>
          <ComputeStock key={stockNo} eps={data.eps[0]} />
          目前股價: {data.dayInfo.price} ({formatHelper.formatDate(data.dayInfo.date)})
        </Box>
        <br />
        <Element data={data.eps} />
      </Box>
    )
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
        step={1}
        onChange={(val) => setRatio(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <br />
      預計股利 = 現金股利 * 分配率
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

function Element(props) {
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
          <>
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
          </>
        );
      })}
    </>
  );
}

function EPS(props) {
  const { eps, quarter } = props;
  return (
    <HStack>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[0].eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[1]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[2]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[3]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{eps}</div>
    </HStack>
  );
}
