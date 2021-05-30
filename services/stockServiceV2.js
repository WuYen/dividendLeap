const DividendInfo = require("../models/dividendInfo/repositoryV2");
const DividendSchedule = require("../models/dividendSchedule/repository");
const {
  tryParseFloat,
  today,
  mongooseQuickSetup,
} = require("../utility/helper");

/* 取得除權息分析資料 */
const getDetail = async (stockNo) => {
  try {
    let dInfo = await DividendInfo.getData(stockNo); //沒有今年的
    let dInfoLY = dInfo.data.find((x) => x.year == "2020") || {};
    let last5 = dInfo.data.filter((x) => +x.year < 2021 && +x.year > 2015);
    let total5 = 0;
    last5.forEach((d) => {
      total5 += d.yieldRateCash;
    });

    let last10 = dInfo.data.filter((x) => +x.year < 2021 && +x.year > 2010);
    let total10 = 0;
    last10.forEach((d) => {
      total10 += d.yieldRateCash;
    });

    let result = {
      stockNo: stockNo,
      dDate: "除息日",
      rate: "今年殖利率%",
      price: "當前股價",
      dCash: "現金股利",
      rateLY: dInfoLY.yieldRateCash + "%", //"去年年殖利率%",
      rateAvg5: (total5 / last5.length).toFixed(2) + "%", //"前五年平均殖利率%",
      rateAvg10: (total10 / last10.length).toFixed(2) + "%", //"前十年平均殖利率%",
      priceLY: dInfoLY.value || "N/A", // "去年除息股價",
      dDateLY: dInfoLY.date || "N/A", // "去年除息日",
      dFDayLY:
        `${parseDate(dInfoLY.fillDate)}` ||
        "N/A" + (!isNaN(dInfoLY.fillDay) ? `(${dInfoLY.fillDay}天)` : ""), //"去年填滿息日",
      lowLY: [{ price: "TODO", date: "TODO" }],
      HighLY: [{ price: "TODO", date: "TODO" }],
    };

    return { success: true, data: result };
  } catch (error) {
    return { success: false, data: {}, error };
  }
};

function parseDate(str) {
  return !isNaN(Date.parse(str)) ? str : "N/A";
}

async function getSchedule() {
  let schedule = await DividendSchedule.getData();
  const filter = afterDate(today());
  let result = [...schedule.data].filter(filter).sort(byTime);
  return { success: true, data: result };
}

function afterDate(date) {
  return (item) => item.date > date;
}

function byTime(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

module.exports = {
  getDetail,
  getSchedule,
};
