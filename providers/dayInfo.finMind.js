const axios = require("axios");
const { today, tryParseFloat, parseChineseDate, getDateFragment, getPureDate } = require("../utilities/helper");
const config = require("../utilities/config");

/**
 * 從 finMind 抓每日盤後個股股價
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
async function getData(query) {
  const { date, stockNo = "5522" } = query;
  const { year, month, day } = getDateFragment(date);
  const dt = year + "-" + month + "-" + day;
  let response = await axios.get(
    `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${stockNo}&start_date=${dt}&end_date=${dt}&token=${config.FINMIND_TOKEN}`
  );
  let rawData = response.data.data;
  if (rawData && Array.isArray(rawData)) {
    let processedData = processData(rawData, stockNo);
    return processedData[0];
  }
  return null;
}

//把raw data 轉換成 mongo schema
function processData(source, stockNo) {
  let updateDate = today();
  let result = source.map((d) => {
    let date = getPureDate(d.date);
    return {
      stockNo: stockNo, // String,
      date: date, //String, //完整日期 20200101
      year: date.substr(0, 4), //String, //年度 2020
      month: date.substr(4, 2), //String, //月份 01
      price: d.close, //Number, //股價
      count: d.Trading_Volume, //Number, //成交筆數
      updateDate, //String,
    };
  });

  return result;
}

module.exports = { getData };
