const Model = require("./model");
const helper = require("../../utility/requestCore");
const {
  updateDate,
  mongooseQuickSetup,
  getDateFragment,
  toDateString,
} = require("../../utility/helper");
const axios = require("axios");

/**
 * 從 twse 整年 每日資料
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
async function getData(stockNo, year) {
  let to = +new Date(`${year}-01-01`) / 1000;
  let from = +new Date(`${year}-12-31`) / 1000;

  let response = await axios.get(
    `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=D&symbol=TWS:${stockNo}:STOCK&from=${from}&to=${to}&quote=1`
  );

  let rawData = response.data.data;

  let processedData = processData(rawData);

  await Model.deleteMany({ stockNo, year });

  let entity = {
    stockNo,
    year,
    data: [...processedData],
    updateDate: updateDate(),
  };

  let result = await new Model(entity).save();
  // console.log(`save day history success`, result);
  return result;
}

//把raw data 轉換成 mongo schema
function processData(source) {
  let result = source.t.map((time, index) => {
    const date = toDateString(new Date(time * 1000 + 3600000 * 8));
    const { month } = getDateFragment(date);
    return {
      date, // String, //交易日期 20190701
      month, // String, //月份 01
      open: source.o[index], // Number, //開盤價
      high: source.h[index], // Number, //最高
      low: source.l[index], // Number, //最低
      price: source.c[index], // Number, //股價(收盤)
      count: source.v[index], // Number, //成交股數
    };
  });

  return result;
}

async function getDataProxy(query) {
  let data = await Model.findOne(query).exec();
  if (!data) {
    let { stockNo, year } = query;
    data = await getData(stockNo, year);
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
  entity: Model,
};

//Test single file: node .\models\dayInfo\repository.js
//mongooseQuickSetup(() => getData("2548", "2020"));
