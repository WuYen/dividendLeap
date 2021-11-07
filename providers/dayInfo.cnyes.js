const axios = require("axios");
const { today, getDateFragment } = require("../utilities/helper");

/**
 * 取歷指定日期的盤後資料
 * @param {string}} stockNo
 */
function getData(Model) {
  return async function (query) {
    const { date = latestTradeDate(), stockNo = "2884" } = query;
    const { year, month, day } = getDateFragment(date);
    let d = +new Date(`${year}-${month}-${day}`) / 1000;
    let response = await axios.get(
      `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=D&symbol=TWS:${stockNo}:STOCK&from=${d}&to=${d}&quote=1`
    );

    //rawData.t => [1609372800,...] 時間 convert   var nd = new Date((1609372800*1000) + 3600000 * 8);
    //rawData.o => [119.5,...] 開盤價
    //rawData.h => [119.5,...] 最高
    //rawData.l => [119.0,...] 最低
    //rawData.c => [119.5,...] 收盤價
    //rawData.v => [301.339,...] 張數
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
  };
}

async function getDataSingle(query) {
  const { date, stockNo = "5522" } = query;
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

    return entity;
  }
  return null;
}

module.exports = { getData, getDataSingle };
