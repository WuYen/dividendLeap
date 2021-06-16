const Model = require("./model");
const helper = require("../../utility/requestCore");
const {
  tryParseFloat,
  today,
  mongooseQuickSetup,
  parseChineseDate,
  getDateFragment,
} = require("../../utility/helper");
const axios = require("axios");

/**
 * 從 twse 抓每日盤後個股股價
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
async function getData({ date, stockNo = "5522" }) {
  let response = await axios.get(
    `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${stockNo}`
  );

  let rawData = response.data.data;

  let processedData = processData(rawData, stockNo);

  const { year, month } = getDateFragment(date);
  await Model.deleteMany({ stockNo, year, month });

  let result = await Model.insertMany(processedData);
  // console.log(`save dayInfo success`, result);
  return result.find((x) => x.date == date);
}

async function getData2() {
  let response = await axios.get(
    `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=D&symbol=TWS:5434:STOCK&from=1609459200&to=1577750400&quote=1`
  );

  let rawData = response.data.data;
  //rawData.t => [1609372800,...] 時間 convert   var nd = new Date((1609372800*1000) + 3600000 * 8);
  //rawData.o => [119.5,...] 開盤價
  //rawData.h => [119.5,...] 最高
  //rawData.l => [119.0,...] 最低
  //rawData.c => [119.5,...] 收盤價
  //rawData.v => [301.339,...] 張數
  return null;
  // let processedData = processData(rawData, stockNo);

  // const { year, month } = getDateFragment(date);
  // await Model.deleteMany({ stockNo, year, month });

  // let result = await Model.insertMany(processedData);
  // // console.log(`save dayInfo success`, result);
  // return result.find((x) => x.date == date);
}

//field index for RawData
const field = {
  date: 0, //日期 ex: 110年06月28日
  count: 1, //成交股數
  amount: 2, //成交金額
  open: 3, //開盤價
  high: 4, //最高價
  low: 5, //最低價
  close: 6, //收盤價
  diff: 7, //漲跌價差
  transCount: 8, //成交筆數
};

//把raw data 轉換成 mongo schema
function processData(source, stockNo) {
  let result = source.map((d) => {
    let date = parseChineseDate(d[field.date]);

    return {
      stockNo: stockNo, // String,
      date: date, //String, //完整日期 20200101
      year: date.substr(0, 4), //String, //年度 2020
      month: date.substr(4, 2), //String, //月份 01
      price: tryParseFloat(d[field.close]), //Number, //股價
      count: parseInt(d[field.transCount].replace(/[^\d+]/g, "")), //Number, //成交筆數
      updateDate: today(), //String,
    };
  });

  return result;
}

async function getDataProxy(query) {
  //query => { stockNo, date }
  if (query.stockNo) {
    let data = await Model.findOne(query).exec();
    if (!data) {
      data = await getData(query);
    }
    return data;
  } else {
    return await Model.find(query).exec();
  }
}

module.exports = {
  getData: getDataProxy,
  entity: Model,
};

//Test single file: node .\models\dayInfo\repository.js
//mongooseQuickSetup(() => getData({ date: "20210601", stockNo: "1597" }));

// (async () => {
//   await getData2();
// })();
