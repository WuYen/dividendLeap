import React, { useCallback, useEffect, useState, useRef } from "react";

export default function StockSocket(props) {
  const keywordRef = useRef();

  const style = { padding: "5px", border: "1px solid black", margin: "2px" };
  return (
    <div>
      <input style={style} ref={keywordRef}></input>
      <button style={style} onClick={() => {}}>
        Watch
      </button>
      <PriceBox stockNo="2884" />
    </div>
  );
}

const token = "";

function PriceBox(props) {
  const { stockNo } = props;
  const [data, updateData] = useState(null);

  useEffect(() => {
    var ws = new WebSocket(`wss://api.fugle.tw/realtime/v0.3/intraday/chart?symbolId=${stockNo}&apiToken=${token}`);
    ws.onopen = function () {
      console.log("open connection");
    };

    ws.onclose = function () {
      console.log("disconnected");
    };

    ws.onmessage = function (message) {
      var data = JSON.parse(message.data);
      console.log(`onmessage`, data);
      let lastClose = data.data.chart.c.at(-1);

      updateData(lastClose);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {stockNo}:<OddsBox price={data} />
    </div>
  );
}

function OddsBox(props) {
  const divRef = useRef();
  const prevPrice = useRef();

  useEffect(() => {
    if (props.price > prevPrice.current) {
      divRef.current.style.color = "red"; //red => 漲
    } else {
      divRef.current.style.color = "green"; //green => 跌
    }
    prevPrice.current = props.price;
  }, [props.price]);

  return <div ref={divRef}>{props.price}</div>;
}
