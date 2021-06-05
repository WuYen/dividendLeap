const DividendInfo = require("./dividendInfo");
const request = require("../../utility/requestCore");
const {
  tryParseFloat,
  updateDate,
  mongooseQuickSetup,
} = require("../../utility/helper");
const mongoose = require("mongoose");

var getUrl = (stockNo) =>
  `https://goodinfo.tw/StockInfo/StockDividendPolicy.asp?STOCK_ID=${stockNo}&SHOW_ROTC=`;

/**
 * 從 good info 取歷年除權息資料
 * @param {string}} stockNo
 */
async function getData(stockNo = 2412) {
  const $ = await request.getHTML(getUrl(stockNo));

  var rawData = parseRawData($);

  let processedData = processData(rawData);

  let entity = {
    stockNo: stockNo,
    data: [...processedData],
    updateDate: updateDate(),
  };

  const dividendInfo = new DividendInfo(entity);

  let result = await dividendInfo.save();
  console.log(`save schedule success`, result);
  return processedData;
}

//get raw data from html document
function parseRawData($) {
  var rawData = [];
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
function processData(source) {
  let result = source.map((data) => {
    return {
      year: data[field.year0], //string 除息年度 2019
      date: "N", //string  除息日期 20190701
      dateFill: "N", //string  填息日期 20190801
      yieldRate: tryParseFloat(data[field.totalRate]), //Number 殖利率total 1.5
      cashDividen: tryParseFloat(data[field.cash2]), //Number 現金股利0.4
      stockDividen: tryParseFloat(data[field.totalRate]), //Number 股票股利0.6
    };
  });

  return result;
}

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern_youtube",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", async () => {
  console.log("Mongoose is connected!!!!");
  let result = await getData();
  console.log("finish");
});
