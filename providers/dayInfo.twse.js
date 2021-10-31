const axios = require("axios");
const { today, tryParseFloat, parseChineseDate, getDateFragment } = require("../utilities/helper");

/**
 * 從 twse 抓每日盤後個股股價
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
function getData(Model) {
  return async function (query) {
    const { date, stockNo = "5522" } = query;
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
  };
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

module.exports = { getData };
