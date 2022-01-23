import React, { useCallback, useEffect, useState, useRef } from "react";
import { Box, Flex, Grid, Button } from "@chakra-ui/react";

export default function StockSocket(props) {
  const keywordRef = useRef();
  const [stockNo, setStockNo] = useState();
  const style = { padding: "5px", border: "1px solid black", margin: "2px" };
  return (
    <div>
      <input style={style} ref={keywordRef}></input>
      <button
        style={style}
        onClick={() => {
          setStockNo(keywordRef.current.value);
        }}
      >
        Watch
      </button>
      {stockNo && <StockBox stockNo={stockNo} />}
    </div>
  );
}

const token = "";

function StockBox(props) {
  const { stockNo } = props;
  const [price, setPrice] = useState(null);
  const [meta, setMeta] = useState(null);
  const serialRef = useRef(0);

  useEffect(() => {
    fetch(`https://api.fugle.tw/realtime/v0.3/intraday/meta?symbolId=${stockNo}&apiToken=${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("meta", data);
        // "meta":{
        //   "market":"TSE",
        //   "nameZhTw":"亞泥",
        //   "industryZhTw":"水泥工業",
        //   "priceReference":44.35,
        //   "priceHighLimit":48.75,
        //   "priceLowLimit":39.95,
        //   "canDayBuySell":true,
        //   "canDaySellBuy":true,
        //   "canShortMargin":true,
        //   "canShortLend":true,
        //   "tradingUnit":1000,
        //   "currency":"TWD",
        //   "isTerminated":false,
        //   "isSuspended":false,
        //   "typeZhTw":"一般股票",
        //   "abnormal":"正常",
        //   "isUnusuallyRecommended":false
        //   }
        setMeta(data.data.meta);
      });
  }, [stockNo]);

  useEffect(() => {
    var ws = new WebSocket(`wss://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=${stockNo}&apiToken=${token}`);
    ws.onopen = function () {
      console.log("open connection");
    };

    ws.onclose = function () {
      console.log("disconnected");
    };

    ws.onmessage = function (message) {
      var data = JSON.parse(message.data);
      console.log(`onmessage`, data);
      // "trade":{
      //   "at":"2022-01-21T13:30:00.000+08:00",
      //   "bid":44.5,
      //   "ask":44.55,
      //   "price":44.5,
      //   "volume":847,
      //   "serial":8126473
      //   },
      if (data.data.quote.trade.serial > serialRef.current) setPrice(data.data.quote.trade.price);
      serialRef.current = data.data.quote.trade.serial;
    };
    return () => {
      ws.close();
    };
  }, [stockNo]);

  return meta && price && <Lyaout stockNo={stockNo} stockName={meta?.nameZhTw} price={price} meta={meta} />;
}

function Lyaout(props) {
  const { stockNo, stockName, price, meta } = props;
  const diff = price - meta.priceReference;
  const diffRate = ((diff / meta.priceReference) * 100).toFixed(2);
  const color = diff > 0 ? "red" : "green";

  return (
    <Box width={"200px"} px={"10px"} py={"4px"}>
      <FlexRowTwoCol>
        <>{stockName}</>
        <Box color={color}>{price.toFixed(2)}</Box> {/* 顯示即時股價 */}
      </FlexRowTwoCol>
      <FlexRowTwoCol>
        <>{stockNo}</>
        <>
          <Box color={color} display={"inline-block"} mr={"2"}>
            {diff.toFixed(2)} {/* 差距 */}
          </Box>
          <Box color={color} display={"inline-block"}>
            {diffRate}%{/* 幅度 */}
          </Box>
        </>
      </FlexRowTwoCol>
    </Box>
  );
}

function FlexRowTwoCol(props) {
  return (
    <Flex>
      <Box mr={"auto !important"}>{props.children[0]}</Box>
      <Box ml={"auto !important"} textAlign={"right"}>
        {props.children[1]}
      </Box>
    </Flex>
  );
}
