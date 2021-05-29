const cheerio = require("cheerio");
const axios = require("axios");
const parse5 = require("parse5");
const DividendInfo = require("../models/dividendInfo/dividendInfo");

var getUrl = (stockNo) =>
  `https://goodinfo.tw/StockInfo/StockDividendPolicy.asp?STOCK_ID=${stockNo}&SHOW_ROTC=`;

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
}
/**
 * 從 good info 取歷年除權息資料
 * @param {string}} stockNo
 */
async function getData(stockNo) {
  const $ = await fetchHTML(getUrl(stockNo));

  var data = [];
  // 篩選有興趣的資料
  $("#divDividendDetailData table tbody tr").each(function () {
    //console.log("row");
    var row = [];
    $(this)
      .find("td")
      .each(function () {
        //console.log($(this).text());
        row.push($(this).text());
      });

    data.push(row);
  });

  let processedData = processData(data);
  let now = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  let entity = {
    stockNo: stockNo,
    data: processedData,
    updateDate: now,
  };
  const dividendInfo = new DividendInfo(entity);

  let result = await dividendInfo.save();
  console.log(`save schedule success`, result);
  return processedData;
  // // 輸出
  // console.log("result", data.length);
}

module.exports = getData;

//test();

function processData(source) {
  let model = Object.entries({
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
  });
  let result = source
    .map((data) => new Model(model, data))
    .filter((x) => parseInt(x.year0, 10));
  return result;
}

function Model(model, source) {
  //loop throuch model property name/value
  for (const [key, value] of model) {
    this[key] = source[value];
  }
}

//二為陣列 => array of object => 寫到DB
//object 要跟 mongo 的schenma共用 還要能共享到前端
