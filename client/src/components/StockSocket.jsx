import React, { useCallback, useEffect, useState, useRef } from "react";
import { Box, Flex, Grid, Button } from "@chakra-ui/react";
import { useMyStocks } from "../hooks/useMyStock";
const manage = Manager();

export default function StockSocket(props) {
  const keywordRef = useRef();
  const [stockNo, setStockNo] = useState([]);
  const [myStock] = useMyStocks();
  let typeData = myStock.filter((x) => x.type == "我的清單");
  const style = { padding: "5px", border: "1px solid black", margin: "2px" };
  useEffect(() => {
    manage.startRunning();
    return () => {
      manage.stopRunning();
    };
  }, []);
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
      </button> */}
      {typeData.map(({ stockNo }) => (
        <StockBox key={stockNo} stockNo={stockNo} />
      ))}
    </div>
  );
}

// export default function StockSocket(props) {
//   const keywordRef = useRef();
//   const [stockNo, setStockNo] = useState();
//   const style = { padding: "5px", border: "1px solid black", margin: "2px" };
//   return (
//     <div>
//       <input style={style} ref={keywordRef}></input>
//       <button
//         style={style}
//         onClick={() => {
//           setStockNo(keywordRef.current.value);
//         }}
//       >
//         Watch
//       </button>
//       {stockNo && <StockBox stockNo={stockNo} />}
//     </div>
//   );
// }

const token = "";

function StockBox(props) {
  const { stockNo } = props;
  const [price, setPrice] = useState(null);
  const [meta, setMeta] = useState(null);
  const serialRef = useRef(0);
  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);
  useEffect(() => {
    manage
      .addJob(`https://api.fugle.tw/realtime/v0.3/intraday/meta?symbolId=${stockNo}&apiToken=${token}`)
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
        isMount.current && setMeta(data.data.meta);
      });
  }, [stockNo]);

  useEffect(() => {
    manage
      .addJob(`https://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=${stockNo}&apiToken=${token}`)
      .then((data) => {
        console.log("quote", stockNo, data);
        if (data.data.quote.trade.serial > serialRef.current && isMount.current) setPrice(data.data.quote.trade.price);
        serialRef.current = data.data.quote.trade.serial;
      });
    var id = setInterval(() => {
      manage
        .addJob(`https://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=${stockNo}&apiToken=${token}`)
        .then((data) => {
          console.log("quote", stockNo, data);
          if (data.data.quote.trade.serial > serialRef.current && isMount.current)
            setPrice(data.data.quote.trade.price);
          serialRef.current = data.data.quote.trade.serial;
        });
    }, 10000);

    // var ws = new WebSocket(`wss://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=${stockNo}&apiToken=${token}`);
    // ws.onopen = function () {
    //   console.log("open connection");
    // };

    // ws.onclose = function () {
    //   console.log("disconnected");
    // };

    // ws.onmessage = function (message) {
    //   var data = JSON.parse(message.data);
    //   console.log(`onmessage`, data);
    //   // "trade":{
    //   //   "at":"2022-01-21T13:30:00.000+08:00",
    //   //   "bid":44.5,
    //   //   "ask":44.55,
    //   //   "price":44.5,
    //   //   "volume":847,
    //   //   "serial":8126473
    //   //   },
    //   if (data.data.quote.trade.serial > serialRef.current) setPrice(data.data.quote.trade.price);
    //   serialRef.current = data.data.quote.trade.serial;
    // };
    // return () => {
    //   ws.close();
    // };
    return () => {
      clearInterval(id);
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

function Manager() {
  let jobQueue = [];
  let counter = 0;
  let stopped = true;

  const batchSize = 10;

  async function DoJob() {
    if (stopped) {
      return;
    }
    let tasks = [];
    let idx = 0;
    let jobLength = Math.min(batchSize, jobQueue.length);
    let t1 = +new Date();
    console.log(`run job [start] length:${jobLength}, total:${jobQueue.length}`);
    while (idx < jobLength) {
      var { url, res } = jobQueue[idx];
      tasks.push(
        fetch(url)
          .then((response) => response.json())
          .then((data) => res(data))
      );
      idx++;
    }
    jobQueue.splice(0, jobLength);
    await Promise.all([
      ...tasks,
      new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, batchSize * 1000);
      }),
    ]);
    let t2 = +new Date();
    console.log(`run job [finish] remain:${jobQueue.length}`, t2 - t1);
    counter = 0;
    !stopped && DoJob();
  }

  function addJob(url, callBack = null) {
    //第一次進queue的要能插隊 => 第一次 queue裡面沒有stockNo的就是第一次
    console.log("add job", `counter:${counter}`);

    let job =
      counter < batchSize
        ? fetch(url).then((res) => res.json())
        : new Promise((res, rej) => {
            jobQueue.push({ url, res });
          });

    counter++;

    return callBack ? job.then(callBack) : job;
  }

  return {
    startRunning: () => {
      if (stopped) {
        stopped = false;
        DoJob();
      }
    },
    stopRunning: () => {
      stopped = true;
    },
    addJob,
    removeJob: () => {},
  };
}
