const axios = require("axios");
const { today, tryParseFloat, parseChineseDate, getDateFragment } = require("../utilities/helper");
const config = require("../utilities/config");

/**
 * 從 twse 抓每日盤後個股股價
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
    return processedData.find((x) => x.date == date);
  }
  return null;
}

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
