const DividendSchedule = require("./model");
const request = require("../../utility/requestCore");
const {
  tryParseFloat,
  updateDate,
  mongooseQuickSetup,
  parseChineseDate,
} = require("../../utility/helper");

/**
 * 取歷年除權息資料 from twse exchangeReport
 * @param {string}} stockNo
 */
async function getData() {
  let response = await request.get(
    `https://www.twse.com.tw/exchangeReport/TWT48U?response=json`
  );

  let rawData = response.data;

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

module.exports = { getData };

//Test single file
//mongooseQuickSetup(getData);
