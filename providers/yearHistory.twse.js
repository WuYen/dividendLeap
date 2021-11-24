const axios = require("axios");
const { today, tryParseFloat, parseChineseDate, getDateFragment, toDateString } = require("../utilities/helper");

/**
 * 從 twse 抓每日盤後個股股價
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
async function getData(query) {
  const { stockNo = "5522" } = query;
  let response = await axios.get(`https://www.twse.com.tw/exchangeReport/FMNPTK?response=json&stockNo=${stockNo}`);

  let rawData = response.data.data;
  if (rawData && Array.isArray(rawData)) {
    let processedData = processData(rawData, stockNo);
    let entity = {
      stockNo,
      data: processedData,
      updateDate: today(),
    };
    return entity;
  }
  return null;
}

//field index for RawData
const field = {
  year: 0, //年度
  valumn: 1, //成交股數
  amount: 2, //成交金額
  records: 3, //成交筆數
  high: 4, //最高價
  hDate: 5, //日期
  low: 6, //最低價
  lDate: 7, //日期
  avg: 8, //收盤平均價
};

//把raw data 轉換成 mongo schema
function processData(source, stockNo) {
  let result = source.map((d) => {
    let year = parseInt(d[field.year]) + 1911;
    let hDate = toDateString(new Date(year + "/" + d[field.hDate]));
    let lDate = toDateString(new Date(year + "/" + d[field.lDate]));
    return {
      year, //年度 2019
      high: tryParseFloat(d[field.high]), //最高價
      hDate, //最高價日期
      low: tryParseFloat(d[field.low]), //最低價
      lDate, //最低價日期
      avg: tryParseFloat(d[field.avg]), //收盤平均價
    };
  });

  return result;
}

module.exports = { getData };
