const DividendInfoModel = require("../models/DividendInfo");
const DayInfoModel = require("../models/DayInfo");
const DayHistoryModel = require("../models/DayHistory");
const ScheduleModel = require("../models/Schedule");
const StockDetailModel = require("../models/StockDetail");

const { latestTradeDate, today } = require("../utility/helper");

/* 取得除權息分析資料 */
async function getDetail(stockNo) {
  const latestTradDate = latestTradeDate();
  const lastYear = "2020";

  //從 stockDetail 抓資料 query:{stockNo, priceDate:latestTradDate}
  let { data, isExpire } = await StockDetailModel.getData({
    stockNo,
    priceDate: latestTradDate,
  });

  if (!data || isExpire) {
    data = await buildData(stockNo, lastYear, latestTradDate);
    data.updateDate = today();
    StockDetailModel.saveData(data); // no need to wait
  }

  return data;
}

async function buildData(stockNo, lastYear, latestTradDate) {
  //歷史的dividend info
  let dInfo = await DividendInfoModel.getData(stockNo); //沒有今年的
  let dInfoLY = dInfo.data.find((x) => x.year == lastYear) || {};

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

  //找今年的dividend info
  let dInfoTY = await ScheduleModel.getByStockNo(stockNo);

  let dayInfo = await DayInfoModel.getData({ stockNo, date: latestTradDate });

  if (dInfoTY.sourceType == "manual") {
    dayInfo = await DayInfoModel.getDataFromWeb({ stockNo, date: latestTradDate });
  }

  //去年整年每天股價
  let dayHistory = await DayHistoryModel.getData({ stockNo, year: lastYear });
  let dayHistoryByMonth = groupByMonth(dayHistory.data);
  let rankByHigh = dayHistoryByMonth
    .map((x) => x.high)
    .sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
  let rankByLow = dayHistoryByMonth
    .map((x) => x.low)
    .sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });

  let result = {
    stockNo: stockNo,
    dDate: dInfoTY.date,
    rate: ((dInfoTY.cashDividen / dayInfo.price) * 100).toFixed(2),
    price: dayInfo.price,
    priceDate: latestTradDate,
    dCash: dInfoTY.cashDividen,
    rateLY: dInfoLY.yieldRateCash ? dInfoLY.yieldRateCash : "--",
    rateAvg5: total5 ? (total5 / last5.length).toFixed(2) : "--",
    rateAvg10: total10 ? (total10 / last10.length).toFixed(2) : "--",
    priceLY: dInfoLY.value || "--",
    dDateLY: dInfoLY.date || "--",
    dFDayLY: `${parseDate(dInfoLY.fillDate)}` || "--" + (!isNaN(dInfoLY.fillDay) ? `(${dInfoLY.fillDay}天)` : ""),
    lowLY: rankByLow.slice(0, 3),
    HighLY: rankByHigh.slice(rankByHigh.length - 3, rankByHigh.length), //最高的三個月份
  };
  return result;
}

function parseDate(str) {
  return !isNaN(Date.parse(str)) ? str : "--";
}

function groupByMonth(data) {
  let result = [];
  for (let index = 0; index < 12; index++) {
    let month = index + 1;
    //抓出那個月的資料
    let dayInfoByMonth = data.filter((x) => {
      return parseInt(x.month) == month;
    });

    //低到高排序
    let sortResult = dayInfoByMonth
      .map((x) => ({ price: x.price, date: x.date }))
      .sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });

    //取出每個月的最高與最低
    let lowInMonth = sortResult[0];
    let highInMonth = sortResult[sortResult.length - 1];
    result.push({ high: highInMonth, low: lowInMonth });
  }
  return result; //[{high,low},...]
}

module.exports = { getDetail };
