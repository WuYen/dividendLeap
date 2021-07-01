const DividendSchedule = require("./model");
const request = require("../../utility/requestCore");
const { tryParseFloat, today, getPureDate } = require("../../utility/helper");

/**
 * 取歷年除權息資料 from 聚財網
 * @param {string}} stockNo
 */
async function getData() {
  const $ = await request.getHTML(
    `https://stock.wearn.com/divid.asp`,
    request.big5Option
  );

  let rawData = parseRawData($);

  let processedData = processData(rawData);

  let entity = {
    data: [...processedData],
    updateDate: today(),
  };

  const dividendSchedule = new DividendSchedule(entity);
  let result = await dividendSchedule.save();
  console.log(`save Dividend Schedule success`, result);
  return result;
}

//convert html document to data
function parseRawData($) {
  let rawData = [];
  // 篩選有興趣的資料

  $(".stockalllist table tr").each(function (index, element) {
    if (index > 2) {
      let cols = $(this).find("td");

      rawData.push([
        $(cols[0]).text(), //stockNo
        $(cols[1]).text(), //stockName
        getPureDate(
          $(cols[2])
            .text()
            .replace(/&nbsp;/g, "")
        ), //date
        tryParseFloat(
          $(cols[3])
            .text()
            .replace(/&nbsp;/g, "") //cashDividen
        ),
      ]);
    }
  });
  return rawData;
}

//field index for RawData
const field = {
  stockNo: 0, //股票代號
  stockNM: 1, //名稱
  date: 2, //除權息日 ex: 20201111
  dCash: 3, //現金股利
};

//把raw data 轉換成 mongo schema
function processData(source) {
  let result = source.map((d) => {
    let date = d[field.date];
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
