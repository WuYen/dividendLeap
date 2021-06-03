const DividendInfo = require("../models/dividendInfo/repositoryV2");
const DayInfo = require("../models/dayInfo/repository");
const DayHistory = require("../models/dayHistory/repository");
const DividendSchedule = require("../models/dividendSchedule/repository");
const {
  tryParseFloat,
  today,
  mongooseQuickSetup,
  latestTradeDate,
} = require("../utility/helper");

/* 取得除權息分析資料 */
async function getDetail(stockNo) {
  try {
    const latestTradDate = latestTradeDate();
    const lastYear = "2020";
    //歷史的dividend info
    let dInfo = await DividendInfo.getData(stockNo); //沒有今年的
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
    let schedule = await DividendSchedule.getData();
    let dInfoTY = schedule.data.find(
      (x) => x.stockNo == stockNo && x.year == "2021"
    );

    let dayInfo = await DayInfo.getData({ stockNo, date: latestTradDate });

    //去年整年每天股價
    let dayHistory = await DayHistory.getData({ stockNo, year: lastYear });
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
      dDate: dInfoTY.date, //"除息日",
      rate: ((dInfoTY.cashDividen / dayInfo.price) * 100).toFixed(2), //"今年殖利率%",
      price: dayInfo.price, // "當前股價",
      priceDate: latestTradDate, // "當前股價 取樣日期",
      dCash: dInfoTY.cashDividen, //"現金股利",
      rateLY: dInfoLY.yieldRateCash ? dInfoLY.yieldRateCash : "--", //"去年年殖利率%",
      rateAvg5: total5 ? (total5 / last5.length).toFixed(2) : "--", //"前五年平均殖利率%",
      rateAvg10: total10 ? (total10 / last10.length).toFixed(2) : "--", //"前十年平均殖利率%",
      priceLY: dInfoLY.value || "--", // "去年除息股價",
      dDateLY: dInfoLY.date || "--", // "去年除息日",
      dFDayLY:
        `${parseDate(dInfoLY.fillDate)}` ||
        "--" + (!isNaN(dInfoLY.fillDay) ? `(${dInfoLY.fillDay}天)` : ""), //"去年填滿息日",
      lowLY: rankByLow.slice(0, 3), //最低的三個月份
      HighLY: rankByHigh.slice(rankByHigh.length - 3, rankByHigh.length), //最高的三個月份
    };

    function parseDate(str) {
      return !isNaN(Date.parse(str)) ? str : "--";
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      data: {},
      error: { message: error.message },
    };
  }
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

async function getSchedule() {
  const schedule = await DividendSchedule.getData();
  const afterToday = afterDate(today());
  const filtedData = schedule.data.filter(afterToday).sort(byTime);
  const dayInfoCollection = await DayInfo.getData({
    date: latestTradeDate(),
  });

  const result = filtedData.map((x) => {
    let dayInfo = dayInfoCollection.find((y) => y.stockNo == x.stockNo);
    if (dayInfo) {
      return {
        ...x.toObject(),
        rate: ((x.cashDividen / dayInfo.price) * 100).toFixed(2), //"今年殖利率%"
        price: dayInfo.price, // "當前股價"
        priceDate: dayInfo.date, // "當前股價 取樣日期"
      };
    } else {
      return x;
    }
  });

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

  return { success: true, data: result };
}

module.exports = {
  getDetail,
  getSchedule,
};
