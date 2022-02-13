const DayInfoModel = require("../models/DayInfo");
const ScheduleModel = require("../models/Schedule");
const StockListModel = require("../models/StockList");
const revenueProvider = require("../providers/revenue.finMind");
const EpsModel = require("../models/Eps");
const { today, latestTradeDate } = require("../utilities/helper");

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

async function getSchedule(query) {
  const [schedule, dayInfoCollection] = await Promise.all([
    ScheduleModel.getData(query),
    DayInfoModel.getData({
      date: latestTradeDate(),
    }),
  ]);

  const filtedData =
    query.sourceType == "除權息預告" ? schedule.filter(afterDate(today())).sort(byTime) : schedule.sort(byTime);

  const result = filtedData.map((x) => {
    let dayInfo = dayInfoCollection.find((y) => y.stockNo == x.stockNo);
    let d = x.toObject();
    if (dayInfo) {
      d.rate = ((x.cashDividen / dayInfo.price) * 100).toFixed(2); //"今年殖利率%"
      d.price = dayInfo.price; // "當前股價"
      d.priceDate = dayInfo.date; // "當前股價 取樣日期"
    }
    if (d.others && d.others.length > 0) {
      d.others.forEach((element) => {
        d[element.key] = element.value;
      });
      delete d.others;
    }
    return d;
  });
  return result;
}

async function getScheduleV2(query) {
  const [schedule, dayInfoCollection] = await Promise.all([
    ScheduleModel.getData(query),
    DayInfoModel.getData({
      date: latestTradeDate(),
    }),
  ]);

  const filtedData =
    query.sourceType == "除權息預告" ? schedule.filter(afterDate(today())).sort(byTime) : schedule.sort(byTime);

  var noList = filtedData.map((x) => x.stockNo);
  const epsList = await EpsModel.find({
    stockNo: {
      $in: noList,
    },
  });
  console.log("epsList", noList, epsList);

  const result = filtedData.map((x) => {
    let dayInfo = dayInfoCollection.find((y) => y.stockNo == x.stockNo);
    let stockInfo = StockListModel.getInfoByNo(x.stockNo);

    let result = { meta: {}, dividend: {}, info: [] };

    result.meta = {
      no: x.stockNo,
      nm: x.stockName,
    };

    try {
      result.meta.industry = stockInfo.industry;
    } catch (error) {
      console.log("industry error", x.stockNo, error);
    }

    if (dayInfo) {
      result.meta.price = dayInfo.price; // "當前股價"
      result.meta.priceDt = dayInfo.date; // "當前股價 取樣日期"
    }

    try {
      result.dividend.date = x.date;
      result.dividend.cash = x.cashDividen;
      result.dividend.rate = ((x.cashDividen / dayInfo.price) * 100).toFixed(2); //"今年殖利率%"
    } catch (error) {
      console.log("今年殖利率計算失敗", error);
    }

    try {
      let epsInfo = epsList.find((y) => y.stockNo == x.stockNo);
      if (epsInfo) {
        const thisYear = epsInfo.data.filter((x) => x.year == 2021);
        const lastYear = epsInfo.data.filter((x) => x.year == 2020);
        let total = [0, 0];
        thisYear.forEach((d, idx) => {
          if (d.eps) {
            let eps1 = parseFloat(d.eps);
            total[0] += eps1; //this year
            let eps2 = parseFloat(lastYear[idx].eps);
            total[1] += eps2; //last year
          }
        });
        var lastYearTotal = 0;
        lastYear.forEach((d, idx) => {
          let eps2 = parseFloat(d.eps);
          lastYearTotal += eps2; //last year
        });
        result.info = [
          { key: "eps1", value: ((total[0] / total[1]) * 100).toFixed(2), text: "去年同期EPS" },
          {
            key: "eps2",
            value: ((total[0] / lastYearTotal) * 100).toFixed(2),
            text: "去年全年EPS",
          },
          { key: "revenue", value: getRevenueRate(), text: "去年全年獲利" },
          { key: "yield5", value: "", text: "5年平均殖利率" },
          { key: "yield10", value: "", text: "10年平均殖利率" },
        ];
      }
    } catch (error) {
      console.log("eps related info error", error);
      result.info = [];
    }

    return result;
  });
  return result;
}

function getRevenueRate(revenue) {
  return "";
  var sum = (acc, next) => {
    return acc + next.revenue;
  };
  var revenueThis = revenue.filter((x) => x.revenue_year == 2021);
  var revenueLast = revenue.filter((x) => x.revenue_year == 2020);
  var totalRevenueThis = revenueThis.reduce(sum, 0);
  var totalRevenueLast = revenueLast.reduce(sum, 0);
  return ((totalRevenueThis / totalRevenueLast) * 100).toFixed(2);
}

/**
 * update all schedule from provider
 * @returns
 */
async function update() {
  let result = await ScheduleModel.updateAll();
  return result;
}

async function getTypes() {
  let result = await ScheduleModel.getTypes();
  return result; //["高殖利率", "排行榜", ...result];
}

module.exports = { getSchedule, getScheduleV2, update, getTypes };
