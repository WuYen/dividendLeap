const helper = require("../utilities/requestCore");
const { tryParseFloat, today, getPureDate } = require("../utilities/helper");

var url = [
  `https://goodinfo.tw/tw/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E9%80%B1KD%E9%BB%83%E9%87%91%E4%BA%A4%E5%8F%89%40%40%E9%80%B1KD%E7%9B%B8%E4%BA%92%E4%BA%A4%E5%8F%89%40%40KD%E9%BB%83%E9%87%91%E4%BA%A4%E5%8F%89`,
  `https://goodinfo.tw/tw/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E9%80%B1KD%E6%AD%BB%E4%BA%A1%E4%BA%A4%E5%8F%89%40%40%E9%80%B1KD%E7%9B%B8%E4%BA%92%E4%BA%A4%E5%8F%89%40%40KD%E6%AD%BB%E4%BA%A1%E4%BA%A4%E5%8F%89`,
];

/**
 * 從 good info 取歷年除權息資料
 * @param {string}} stockNo
 */
async function getData(index) {
  const $ = await helper.getHTML(url[index]);

  var rawData = parseRawData($);

  //let processedData = processData(stockNo, rawData);

  return rawData;
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
  year0: 0, //年度 ex: 2018
  cash0: 1, //現金股利盈餘
  cash1: 2, //現金股利公積
  cash2: 3, //現金股利合計
  stock0: 4, //股票股利盈餘
  stock1: 5, //股票股利公積
  stock2: 6, //股票股利合計
  dividendTotal: 7, //股利合計
  dividendCash: 8, //股利總計現金
  dividendStock: 9, //股利總計股票
  day0: 10, //填息花費日數
  day1: 11, //填權花費日數
  year1: 12, //殖利率統計股價年度
  high: 13, //殖利率統計股價最高
  low: 14, //殖利率統計股價最低
  avg: 15, //殖利率統計股價年均
  cashRate: 16, //年均殖利率現金(%)
  stockRate: 17, //年均殖利率股票(%)
  totalRate: 18, //年均殖利率合計(%)
  year2: 19, //盈餘分配率統計股利所屬期間
  EPS: 20, //盈餘分配率統計EPS
  dividendRate0: 21, //盈餘分配率統計配息
  dividendRate1: 22, //盈餘分配率統計配股
  dividendRate2: 23, //盈餘分配率統計合計
};

//把raw data 轉換成 mongo 要的格式
function processData(stockNo, source) {
  const updateDate = today();
  let result = [];

  source.forEach((data) => {
    let year = getPureDate(data[field.year0] || "");
    if (year) {
      let cashDividend = tryParseFloat(data[field.cash0]); //現金股利0.4
      let eps = tryParseFloat(data[field.EPS]); //EPS
      let payoutRatio = tryParseFloat((cashDividend / eps).toFixed(3));
      result.push({
        stockNo: stockNo,
        year: year, //除息年度 2019
        cashDividen: cashDividend, //現金股利0.4
        cashDividenCapital: tryParseFloat(data[field.cash1]), //現金公積股利0.4
        cashDividenTotal: tryParseFloat(data[field.cash2]), //現金股利合計
        eps: eps, //EPS
        payoutRatio: payoutRatio,
        updateDate: updateDate,
      });
    }
  });

  return result;
}

module.exports = { getData };
