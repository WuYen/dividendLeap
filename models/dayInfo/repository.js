const Model = require("./model");
const helper = require("../../utility/requestCore");
const {
  tryParseFloat,
  updateDate,
  mongooseQuickSetup,
} = require("../../utility/helper");
const axios = require("axios");

/**
 * 從 good info 每日盤後個股股價
 * @param {string}} stockNo
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

//field index for RawData
//["日期","成交股數","成交金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"]
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

//把raw data 轉換成 mongo 要的格式
function processData(source, stockNo) {
  let result = source.map((d) => {
    let date = parseDate(d[field.date]);
    return {
      stockNo: stockNo, // String,
      date: date, //String, //完整日期 20200101
      year: date.substr(0, 4), //String, //年度 2020
      month: date.substr(4, 2), //String, //月份 01
      price: +d[field.close], //Number, //股價
      count: parseInt(d[field.transCount].replace(/[^\d+]/g, "")), //Number, //成交筆數
      updateDate: updateDate(), //String,
    };
  });

  return result;
}

function parseDate(str) {
  return `${+str.replace(/\D/g, "") + 19110000}`;
}

function getDateFragment(str) {
  return {
    year: str.substr(0, 4),
    month: str.substr(4, 2),
    day: str.substr(6, 2),
  };
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

//node .\models\dayInfo\repository.js
//Test single file
//mongooseQuickSetup(() => getData({ date: "20210601", stockNo: "1597" }));
