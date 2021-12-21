const helper = require("../utilities/requestCore");
const { tryParseFloat, today, getPureDate } = require("../utilities/helper");

var url = [
  `https://goodinfo.tw/tw/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E9%80%B1K%E5%80%BC%E4%BD%8E%E6%96%BC20%40%40%E9%80%B1KD%E8%90%BD%E9%BB%9E%40%40K%E5%80%BC%E4%BD%8E%E6%96%BC20`,
  `https://goodinfo.tw/tw/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E9%80%B1K%E5%80%BC+20%7E40%40%40%E9%80%B1KD%E8%90%BD%E9%BB%9E%40%40K%E5%80%BC+20%7E40`,
  `https://goodinfo.tw/tw/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E9%80%B1K%E5%80%BC+40%7E60%40%40%E9%80%B1KD%E8%90%BD%E9%BB%9E%40%40K%E5%80%BC+40%7E60`,
  `https://goodinfo.tw/tw/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E9%80%B1K%E5%80%BC+60%7E80%40%40%E9%80%B1KD%E8%90%BD%E9%BB%9E%40%40K%E5%80%BC+60%7E80`,
  `https://goodinfo.tw/tw/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E9%80%B1K%E5%80%BC%E9%AB%98%E6%96%BC80%40%40%E9%80%B1KD%E8%90%BD%E9%BB%9E%40%40K%E5%80%BC%E9%AB%98%E6%96%BC80`,
];

/**
 * 從 good info 取歷年除權息資料
 * @param {string}} stockNo
 */
async function getData(index) {
  const $ = await helper.getHTML(url[index]);

  var rawData = parseRawData($);

  let processedData = processData(rawData);

  return processedData;
}

//get raw data from html document
function parseRawData($) {
  var rawData = [];
  // 篩選有興趣的資料
  $("#tblStockList tr:not(:first-child):not(.bg_h2)").each(function () {
    //console.log("row");
    var row = [];
    $(this)
      .find("td")
      .each(function () {
        row.push(($(this).text() || "").replace(/[↘|↗]/g, ""));
      });

    rawData.push(row);
  });
  return rawData;
}

const field = {
  no: 0, //代號
  nm: 1, //名稱
  k: 11, //K值
  d: 12, //D值
};

//把raw data 轉換成 mongo 要的格式
function processData(source) {
  const updateDate = today();
  return source.map((data) => ({
    stockNo: data[field.no],
    stockName: data[field.nm],
    k: tryParseFloat(data[field.k]),
    d: tryParseFloat(data[field.d]),
    updateDate: updateDate,
  }));
}

module.exports = { getData };
