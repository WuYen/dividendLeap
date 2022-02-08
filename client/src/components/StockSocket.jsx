import React, { useCallback, useEffect, useState, useRef } from "react";
import { Box, Flex, Grid, Button } from "@chakra-ui/react";
import { useMyStocks } from "../hooks/useMyStock";
import manage from "../utils/fugleApi";

export default function StockSocket(props) {
  const keywordRef = useRef();
  const [stockNo, setStockNo] = useState([]);
  const [myStock] = useMyStocks();
  let typeData = myStock.filter((x) => x.type == "我的清單");
  const style = { padding: "5px", border: "1px solid black", margin: "2px" };

  manage.startRunning();
  useEffect(() => {
    return () => {
      manage.stopRunning();
    };
  }, []);

  console.log("typeData", typeData);

  return (
    <div>
      {/* <input style={style} ref={keywordRef}></input>
      <button
        style={style}
        onClick={() => {
          setStockNo((x) => [...x, keywordRef.current.value]);
        }}
      >
        Watch
      </button>

      {stockNo.map((stockNo) => (
        <StockBox key={stockNo} stockNo={stockNo} />
      ))} */}
      {typeData.map(({ stockNo }) => (
        <StockBox key={stockNo} stockNo={stockNo} />
      ))}
    </div>
  );
}

const token = "";

function StockBox(props) {
  const { stockNo } = props;

  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  return (
    <MetaProvider stockNo={stockNo} isMount={isMount}>
      {({ meta }) => {
        return (
          <PriceProvider stockNo={stockNo} isMount={isMount}>
            {({ price }) => <Layout stockNo={stockNo} stockName={meta?.nameZhTw} price={price} meta={meta} />}
          </PriceProvider>
        );
      }}
    </MetaProvider>
  );
}

function MetaProvider(props) {
  const { isMount, stockNo } = props;
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    manage
      .addJob(`https://api.fugle.tw/realtime/v0.3/intraday/meta?symbolId=${stockNo}&apiToken=${token}`)
      .then((data) => {
        //console.log("meta", data);
        isMount.current && setMeta(data.data.meta);
      });
  }, [stockNo]);

  return meta && props.children({ meta });
}

function PriceProvider(props) {
  const { isMount, stockNo } = props;
  const [price, setPrice] = useState(null);
  const serialRef = useRef(0);

  useEffect(() => {
    var task = () =>
      manage
        .addJob(`https://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=${stockNo}&apiToken=${token}`)
        .then((data) => {
          //console.log("quote", stockNo, data);
          if (data.data.quote.trade.serial > serialRef.current && isMount.current)
            setPrice(data.data.quote.trade.price);
          serialRef.current = data.data.quote.trade.serial;
        });

    task();

    var id = setInterval(() => {
      task();
    }, 10000);

    return () => {
      clearInterval(id);
    };
  }, [stockNo]);

  return price && props.children({ price });
}

function Layout(props) {
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

// function useFugleMeta(props) {
//   const { stockNo } = props;
//   const [meta, setMeta] = useState(null);

//   useEffect(() => {
//     fetch(`https://api.fugle.tw/realtime/v0.3/intraday/meta?symbolId=${stockNo}&apiToken=${token}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("meta", data);
//         setMeta(data.data.meta);
//         // "meta":{
//         //   "market":"TSE",
//         //   "nameZhTw":"亞泥",
//         //   "industryZhTw":"水泥工業",
//         //   "priceReference":44.35,
//         //   "priceHighLimit":48.75,
//         //   "priceLowLimit":39.95,
//         //   "canDayBuySell":true,
//         //   "canDaySellBuy":true,
//         //   "canShortMargin":true,
//         //   "canShortLend":true,
//         //   "tradingUnit":1000,
//         //   "currency":"TWD",
//         //   "isTerminated":false,
//         //   "isSuspended":false,
//         //   "typeZhTw":"一般股票",
//         //   "abnormal":"正常",
//         //   "isUnusuallyRecommended":false
//         //   }
//       });
//   }, [stockNo]);

//   return meta;
// }
