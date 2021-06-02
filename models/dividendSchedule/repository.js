const DividendSchedule = require("./model");
const helper = require("../../utility/requestCore");
const {
  tryParseFloat,
  updateDate,
  mongooseQuickSetup,
  parseChineseDate,
} = require("../../utility/helper");
const axios = require("axios");

/**
 * 從 good info 取歷年除權息資料
 * @param {string}} stockNo
 */
async function getData() {
  let response = await axios.get(
    `https://www.twse.com.tw/exchangeReport/TWT48U?response=json`
  );

  let rawData = response.data.data;

  let processedData = processData(rawData);

  let entity = {
    data: [...processedData],
    updateDate: updateDate(),
  };

  const dividendSchedule = new DividendSchedule(entity);

  let result = await dividendSchedule.save();
  //console.log(`save Dividend Schedule success`, result);
  return result;
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
function processData(source) {
  let result = source.map((d) => {
    let date = parseChineseDate(d[field.date]);
    return {
      stockNo: d[field.stockNo],
      stockName: d[field.stockNM],
      year: date.substr(0, 4), //除息年度 2019
      date: date, //除息日期 20190701
      cashDividen: d[field.dCash], //現金股利0.4
    };
  });

  return result;
}

async function getDataProxy(needLatest = false) {
  //find data with date and sotock no, if not exist call getData to retrive from web
  //if out of date, call getData to retrive from web
  const query = {
    ...(needLatest && { updateDate: updateDate() }),
  };
  let data = await DividendSchedule.findOne(query).exec();
  if (!data) {
    data = await getData();
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
  entity: DividendSchedule,
};

//Test single file
//mongooseQuickSetup(getData);
