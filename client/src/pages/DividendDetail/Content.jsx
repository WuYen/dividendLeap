import React, { useEffect, useState, useRef } from "react";
import { Box, Link, Divider, useBreakpointValue, Button } from "@chakra-ui/react";

import { formatHelper } from "../../utils";
import StockFrame from "./StockFrame";
import BackButton from "./BackButton";
import * as MyStock from "../../pages/MyStock/Content";

const breakPoints = {
  base: "sm",
  sm: "sm",
  md: "md",
};

export default function Content(props) {
  const { stockNo } = props;
  const divRef = useRef();
  const [showFrame, setShowFrame] = useState(false);
  const [oldView, setOldView] = useState(false);
  const variant = useBreakpointValue(breakPoints);
  const [myData, myLoading] = MyStock.useFetchData(stockNo);

  return (
    <Box ref={divRef}>
      <Box p="4" d="flex" flexWrap="wrap" alignItems="baseline">
        <ControlPanel variant={variant} showFrame={showFrame} setShowFrame={setShowFrame} setOldView={setOldView} />
      </Box>
      {oldView ? (
        <Box d="flex" flexWrap="wrap" alignItems="baseline">
          <Display {...props} />
        </Box>
      ) : (
        <Box mx="4" mb="4" color="gray.600">
          <MyStock.Content stockNo={stockNo} data={myData} loading={myLoading} />
        </Box>
      )}
      {showFrame && <StockFrame stockNo={stockNo} divRef={divRef} variant={variant} />}
    </Box>
  );
}

function ControlPanel(props) {
  const { variant, setOldView, showFrame, setShowFrame } = props;
  return (
    <>
      <BackButton variant={variant} />
      <Button
        loadingText="切換顯示"
        colorScheme="teal"
        variant="outline"
        size="sm"
        spinnerPlacement="end"
        _focus={{ outline: "none" }}
        onClick={() => {
          setOldView((x) => !x);
        }}
      >
        切換顯示
      </Button>
      <Button
        ml="2"
        loadingText="更多資訊"
        colorScheme="teal"
        variant="outline"
        size="sm"
        spinnerPlacement="end"
        _focus={{ outline: "none" }}
        onClick={() => {
          setShowFrame((x) => !x);
        }}
      >
        {showFrame ? "隱藏資訊" : "更多資訊"}
      </Button>
    </>
  );
}

function Display(props) {
  const { stockNo, name, data = {} } = props;
  const info = [
    { label: "名稱", content: `${name} (${stockNo})` },
    { label: "除息日", content: formatHelper.formatDate(data.dDate) },
    { label: "今年殖利率", content: `${data.rate}%` },
    { label: "當前股價", content: `${data.price}(${formatHelper.formatDate(data.priceDate)})` },
    { label: "現金股利", content: data.dCash },
    { label: "去年殖利率", content: `${data.rateLY}%` },
    { label: "前五年平均殖利率", content: `${data.rateAvg5}%` },
    { label: "前十年平均殖利率", content: `${data.rateAvg10}%` },
    { label: "去年除息股價", content: data.priceLY },
    { label: "去年除息日", content: formatHelper.formatDate(data.dDateLY) },
    { label: "去年填滿息日", content: formatHelper.formatDate(data.dFDayLY) },
    { label: "去年低點", content: <HistoryPrice data={data.lowLY} /> },
    { label: "去年高點", content: <HistoryPrice data={data.HighLY} /> },
  ];
  return info.map((item) => (
    <Box m="4" color="gray.600">
      {item.label}:
      <Divider />
      {item.content}
    </Box>
  ));
}

function HistoryPrice(props) {
  return props.data.map((item, index) => {
    return item ? (
      <div key={item.date}>{`${item.price} (${formatHelper.formatDate(item.date)})`}</div>
    ) : (
      <div key={index}>--</div>
    );
  });
}
