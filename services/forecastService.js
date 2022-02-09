const EpsModel = require("../models/Eps");
const DividendDetailModel = require("../models/DividendDetail");
const DividendInfoModel = require("../models/DividendInfo");
const DayInfoModel = require("../models/DayInfo");
const StockListModel = require("../models/StockList");
const YearHistoryModel = require("../models/YearHistory");
const DayHistoryModel = require("../models/DayHistory");
const helper = require("../utilities/helper");
const stockDetailService = require("./stockDetailService");
const { getRandomIntInclusive, delay } = require("../utilities/delay");
const revenueProvider = require("../providers/revenue.finMind");

function accumulateEps(data) {
  return data.reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + parseFloat(currentValue.eps);
  }, 0);
}

// targetYear = 2022(明年)
async function predictV2(stockNo = "2451", targetYear) {
  let [epsData, dividendDetailData, dayInfoData, dividendInfoData, yearHistoryData, stockDetail, revenue] =
    await Promise.all([
      EpsModel.getData(stockNo), //eps 資料全撈
      DividendDetailModel.getByRange({
        stockNo,
        start: `${targetYear - 5}`,
        end: `${targetYear - 1}`,
      }), //先抓過去五年的DividendDetail
      DayInfoModel.getData({ stockNo, date: helper.latestTradeDate() }),
      DividendInfoModel.getData(stockNo),
      YearHistoryModel.getData({ stockNo }),
      stockDetailService.getDetail(stockNo, targetYear),
      revenueProvider.getData({ year: targetYear, stockNo }),
    ]);

  if (!yearHistoryData) {
    yearHistoryData = { data: [] };
  }
  let pass5Year = [];
  let getMonthHighLowPromise = [];
  //for each DividendDetail 去filter eps
  dividendDetailData.forEach((dividend, index) => {
    let epsYear = parseInt(dividend.year) - 1; //2021
    let dInfo = dividendInfoData.data.find((x) => x.year == dividend.year) || {};
    let yInfo = yearHistoryData.data.find((x) => x.year == dividend.year) || {};
    getMonthHighLowPromise.push(
      delay(getRandomIntInclusive(350 * index)).then(() => stockDetailService.getMonthHighLow(stockNo, dividend.year))
    );
    pass5Year.push({
      year: dividend.year,
      totalEps: dividend.eps,
      cashDividend: dividend.cashDividen,
      estimateDividend: null,
      q: epsData.data.filter((x) => x.year == epsYear), //各Q EPS
      rate: dividend.payoutRatio, //分配率
      dDate: dInfo.date || "", //除息日
      dPrice: dInfo.value || "", //除權息前股價
      yieldRate: dInfo.yieldRateCash || "", //現金殖利率
      yearAvg: yInfo.avg, //年均價
    });
  });

  let monthHighLow = await Promise.all(getMonthHighLowPromise);
  pass5Year.forEach((x, index) => {
    x.lowLY = monthHighLow[index].rankByLow.slice(0, 3); //最低的三個月份
    x.HighLY = monthHighLow[index].rankByHigh.slice(0, 3); //最高的三個月份
  });

  //targetYear的eps
  let epsYear = targetYear - 1; //2021
  let eps = epsData.data.filter((x) => x.year == epsYear);
  let totalEps = accumulateEps(eps); //計算該年度累積eps

  //預測先直接沿用去年的payout rate
  let prevPayoutRate = dividendDetailData[0].payoutRatio;
  let estimateDividend = (totalEps * prevPayoutRate).toFixed(2);

  let baseInfo = StockListModel.getNameByNo(stockNo);

  return {
    stockNo: stockNo,
    baseInfo: baseInfo,
    dayInfo: dayInfoData,
    stockDetail: stockDetail,
    revenue: revenue,
    eps: [
      {
        year: `${targetYear}`,
        totalEps: helper.tryParseFloat(totalEps.toFixed(2)),
        cashDividend: null,
        estimateDividend: helper.tryParseFloat(estimateDividend),
        q: eps,
        rate: prevPayoutRate,
      },
      ...pass5Year,
    ],
  };
}

//移除這支股票相關的資料讓他重做
function resetDataSource(stockNo) {
  Promise.all([
    EpsModel.reset(stockNo),
    DividendDetailModel.reset(stockNo),
    DividendInfoModel.reset(stockNo),
    DayInfoModel.reset({ stockNo, date: helper.latestTradeDate() }),
    YearHistoryModel.reset({ stockNo }),
    DayHistoryModel.reset({ stockNo, year: (new Date().getFullYear() - 1).toString() }),
  ]);
  //DayHistoryModel.reset({ stockNo, year: new Date().getFullYear().toString() }),
  return "success";
}

module.exports = {
  predict: predictV2,
  resetDataSource: resetDataSource,
};
