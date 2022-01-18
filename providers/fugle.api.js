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
  build({ channel, stockNo }) {
    return `https://${api}/${channel}?symbolId=${stockNo}&apiToken=${config.FUGLE_TOKEN}`;
  },
  buildWS({ channel, stockNo }) {
    return `wss://${api}/${channel}?symbolId=${stockNo}&apiToken=${config.FUGLE_TOKEN}`;
  },
};

//提供盤中個股/指數逐筆交易金額、狀態、最佳五檔及統計資訊
//https://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=2884&apiToken=demo

async function chart(stockNo = 2884) {
  //提供盤中即時開高低收價量資料, 方便您繪製各種線圖
  var response = await helper.get(url.build({ channel: channel.chart, stockNo }));
  console.log("chart response", response);

  return response;
}

function chartSocket(stockNo = 2884) {
  //提供盤中即時開高低收價量資料, 方便您繪製各種線圖
  let ws = new WebSocket(url.buildWS({ channel: channel.chart, stockNo, ws: true }));
  ws.onopen = function () {
    console.log("open connection");
  };

  ws.onclose = function () {
    console.log("disconnected");
  };

  ws.onmessage = function (message) {
    //console.log(`onmessage`, message);
    console.log(`data`, JSON.parse(message.data));
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
