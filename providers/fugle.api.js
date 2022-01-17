const helper = require("../utilities/requestCore");
const config = require("../utilities/config");
const WebSocket = require("isomorphic-ws");

const version = "v0.3";
const api = `api.fugle.tw/realtime/${version}/intraday`;
const channel = {
  quote: "quote",
  chart: "chart",
  meta: "meta",
  dealts: "dealts",
  volumes: "volumes",
};

const url = {
  build({ channel, stockNo, ws = false }) {
    return (ws ? "wss://" : "https://") + `${api}/${channel}?symbolId=${stockNo}&apiToken=${config.FUGLE_TOKEN}`;
  },
};

//提供盤中個股/指數逐筆交易金額、狀態、最佳五檔及統計資訊
//https://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=2884&apiToken=demo

async function chart(stockNo = 2884) {
  //提供盤中即時開高低收價量資料, 方便您繪製各種線圖
  //  wss://api.fugle.tw/realtime/v0.3/intraday/chart?symbolId=2884&apiToken=demo

  var data = await helper.get(url.build({ channel: channel.chart, stockNo }));
  console.log("chart response", data);
}

function chartSocket(stockNo = 2884) {
  //提供盤中即時開高低收價量資料, 方便您繪製各種線圖
  //  wss://api.fugle.tw/realtime/v0.3/intraday/chart?symbolId=2884&apiToken=demo
  let ws = new WebSocket(url.build({ channel: channel.chart, stockNo, ws: true }));
  ws.onopen = () => {
    console.log("open connection");
  };
  ws.onopen = function open() {
    console.log("connected");
    ws.send(Date.now());
  };

  ws.onclose = function close() {
    console.log("disconnected");
  };

  ws.onmessage = function incoming(data) {
    console.log(`onmessage`, data);
  };
}

module.exports = {
  chart,
  chartSocket,
};

//提供盤中個股/指數當日基本資訊
//https://api.fugle.tw/realtime/v0.3/intraday/meta?symbolId=2884&apiToken=demo

//取得個股當日所有成交資訊（如: 個股價量、大盤總量
//https://api.fugle.tw/realtime/v0.3/intraday/dealts?symbolId=2884&apiToken=demo&limit=3

//提供盤中個股即時分價量
//https://api.fugle.tw/realtime/v0.3/intraday/volumes?symbolId=2884&apiToken=demo&limit=3
