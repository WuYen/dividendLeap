const request = require("../utilities/requestCore");
const { tryParseFloat, today, parseChineseDate, getDateFragment } = require("../utilities/helper");

/**
 * 取歷年除權息資料 from twse exchangeReport
 * @param {string}} stockNo
 */
async function getData() {
  let response = await request.get(`https://www.twse.com.tw/exchangeReport/TWT48U?response=json`);

  let rawData = response.data;

  let processedData = processData(rawData, today());

  return processedData;
}

//field index for RawData
const field = {
  date: 0, //除權息日 ex: 110年06月28日
  stockNo: 1, //股票代號
  stockNM: 2, //名稱
  type: 3, //除權or息
  dCash: 7, //現金股利
};

//把raw data 轉換成 mongo schema
function processData(source, today) {
  const result = source.map((d) => {
    const date = parseChineseDate(d[field.date]);
    const { year, month } = getDateFragment(date);
    const cashDividen = tryParseFloat(d[field.dCash]);
    return {
      stockNo: d[field.stockNo],
      stockName: d[field.stockNM],
      year: year, //除息年度 2019
      month: month,
      date: date, //除息日期 20190701
      cashDividen, //現金股利0.4
      updateDate: today,
      sourceType: "twse",
    };
  });

  return result;
}

module.exports = { getData };
