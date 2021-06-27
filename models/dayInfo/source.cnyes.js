const Model = require("./model");
const {
  tryParseFloat,
  today,
  mongooseQuickSetup,
  parseChineseDate,
  getDateFragment,
  getPureDate,
  latestTradeDate,
} = require("../../utility/helper");
const axios = require("axios");

/**
 * 取歷指定日期的盤後資料
 * @param {string}} stockNo
 */
async function getData({ date = latestTradeDate(), stockNo = "2884" }) {
  const { year, month, day } = getDateFragment(date);
  let d = +new Date(`${year}-${month}-${day}`) / 1000;
  let response = await axios.get(
    `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=D&symbol=TWS:${stockNo}:STOCK&from=${d}&to=${d}&quote=1`
  );

  let rawData = response.data.data;
  if (rawData.t[0] === d) {
    let c = rawData.c[0];
    let v = rawData.v[0];
    let entity = {
      stockNo: stockNo, // String,
      date: date, //String, //完整日期 20200101
      year: year, //String, //年度 2020
      month: month, //String, //月份 01
      price: c, //Number, //股價
      count: parseInt(v), //Number, //成交筆數//.replace(/[^\d+]/g, "")
      updateDate: today(), //String,
      sourceType: "cnyes",
    };

    const model = new Model(entity);
    const result = await model.save();
    return result;
  }
  return null;
  //rawData.t => [1609372800,...] 時間 convert   var nd = new Date((1609372800*1000) + 3600000 * 8);
  //rawData.o => [119.5,...] 開盤價
  //rawData.h => [119.5,...] 最高
  //rawData.l => [119.0,...] 最低
  //rawData.c => [119.5,...] 收盤價
  //rawData.v => [301.339,...] 張數
}

// //field index for RawData
// const field = {
//   date: 0, //除權息日 ex: 110年06月28日
//   stockNo: 1, //股票代號
//   stockNM: 2, //名稱
//   type: 3, //除權or息
//   dCash: 7, //現金股利
// };

// //把raw data 轉換成 mongo schema
// function processData(source) {
//   let result = source.map((d) => {
//     let date = parseChineseDate(d[field.date]);
//     let cashDividen = tryParseFloat(d[field.dCash]);
//     return {
//       stockNo: d[field.stockNo],
//       stockName: d[field.stockNM],
//       year: date.substr(0, 4), //除息年度 2019
//       date: date, //除息日期 20190701
//       cashDividen, //現金股利0.4
//     };
//   });

//   return result;
// }

module.exports = { getData };

// //Test single file
// mongooseQuickSetup(async () => {
//   const result = await getData({});
// });
