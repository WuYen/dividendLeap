const helper = require("../utilities/requestCore");
const config = require("../utilities/config");
const WebSocket = require("isomorphic-ws");

const channel = {
  quote: "quote", //提供盤中個股/指數逐筆交易金額、狀態、最佳五檔及統計資訊
  chart: "chart", //提供盤中即時開高低收價量資料, 方便您繪製各種線圖
  meta: "meta", //提供盤中個股/指數當日基本資訊
  dealts: "dealts", //取得個股當日所有成交資訊（如: 個股價量、大盤總量)
  volumes: "volumes", //提供盤中個股即時分價量
};

const url = {
  build({ channel, stockNo }) {
    return `https://${config.FUGLE_URI}/${channel}?symbolId=${stockNo}&apiToken=${config.FUGLE_TOKEN}`;
  },
  buildWS({ channel, stockNo }) {
    return `wss://${config.FUGLE_URI}/${channel}?symbolId=${stockNo}&apiToken=${config.FUGLE_TOKEN}`;
  },
};

async function httpClient(channel, stockNo = 2884) {
  var response = await helper.get(url.build({ channel, stockNo }));
  console.log(`httpClient ${channel}`, response);

  return response;
}

function socketClient(channel, stockNo = 2884, callBack) {
  let ws = new WebSocket(url.buildWS({ channel, stockNo }));
  ws.onopen = function () {
    console.log("open connection");
  };

  ws.onclose = function () {
    console.log("disconnected");
  };

  ws.onmessage = function (message) {
    //console.log(`onmessage`, message);
    console.log(`socketClient ${channel}`, JSON.parse(message.data));
    callBack && callBack(JSON.parse(message.data));
  };
}

module.exports = {
  channel,
  httpClient,
  socketClient,
};
