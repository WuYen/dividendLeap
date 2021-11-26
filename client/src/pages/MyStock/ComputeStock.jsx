import React, { useState } from "react";
import { HStack, Input, SliderThumb, SliderFilledTrack, SliderTrack, Slider } from "@chakra-ui/react";

export default function ComputeStock(props) {
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
        step={0.2}
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
