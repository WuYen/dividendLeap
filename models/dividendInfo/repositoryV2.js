const DividendInfo = require("./modelV2");
const helper = require("../../utility/requestCore");
const {
  tryParseFloat,
  updateDate,
  mongooseQuickSetup,
} = require("../../utility/helper");

var getUrl = (stockNo) => `https://stockinfo.tw/?stockSearch=${stockNo}`;

/**
 * 從 stockinfo 取歷年除權息資料
 * @param {string}} stockNo
 */
async function getData(stockNo = "2412") {
  const $ = await helper.fetchHTML(getUrl(stockNo));

  let rawData = parseRawData($);

  let processedData = processData(rawData);

  let entity = {
    stockNo: stockNo,
    data: [...processedData],
    updateDate: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
  };

  const dividendInfo = new DividendInfo(entity);

  let result = await dividendInfo.save();
  console.log(`save schedule success`, result);
  return result;
}

//get raw data from html document
function parseRawData($) {
  let rawData = [];
  // 篩選有興趣的資料
  $("h2").each(function () {
    if ($(this).text().includes("股利政策")) {
      let rows = $(this).parent().next().find("tr");
      $(rows).each(function () {
        let row = [];
        $(this)
          .find("td")
          .each(function (index, element) {
            let text = $(this).text();
            let isDate = text.match(/\d{4}\/\d{2}\/\d{2}/gm);
            isDate && isDate[0] && (text = isDate[0]);
            row.push(text);
          });
        rawData.push(row);
      });
    }
  });
  rawData.shift(); //第一列是空資料
  return rawData;
}

//field index for RawData
const field = {
  date: 0, //除權息日 ex: 2020/07/02
  value: 1, //除權息前股價
  dCash: 2, //配息
  dStock: 3, //配股
  dCashRate: 4, //現金殖利率
  dStockRate: 5, //股票殖利率
  dTotalRate: 6, //合計殖利率
  PE_Rate: 7, //本益比
  EPS: 8, //EPS
  fillDay: 9, //填息天數
  fillDate: 10, //填息日期
};

//把raw data 轉換成 mongo 要的格式
function processData(source) {
  let result = source.map((data) => {
    return {
      year: data[field.date].substr(0, 4), //除息年度 2019
      date: data[field.date].replace(/\//g, ""), //除息日期 20190701
      value: tryParseFloat(data[field.value]), //除權息前股價
      cashDividen: tryParseFloat(data[field.dCash]), //配息 0.4
      stockDividen: tryParseFloat(data[field.dStock]), //配股 0.6
      yieldRateCash: tryParseFloat(data[field.dCashRate]), //現金殖利率 1.5
      yieldRateStock: tryParseFloat(data[field.dStockRate]), //股票殖利率 1.5
      yieldRateTotal: tryParseFloat(data[field.dTotalRate]), //合計殖利率 1.5
      PE_Rate: tryParseFloat(data[field.PE_Rate]), //本益比
      EPS: tryParseFloat(data[field.EPS]), //EPS
      fillDay: data[field.fillDay], //填息天數
      fillDate: data[field.fillDate], //填息日期
    };
  });

  return result;
}

async function getDataProxy(stockNo, needLatest = false) {
  //find data with date and sotock no, if not exist call getData to retrive from web
  //if out of date, call getData to retrive from web
  const query = {
    stockNo: stockNo,
    ...(needLatest && { updateDate: updateDate() }),
  };
  let data = await DividendInfo.findOne(query).exec();
  if (!data) {
    data = await getData(stockNo);
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
  entity: DividendInfo,
};

//Test single file
//mongooseQuickSetup(getData);