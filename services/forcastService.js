const EpsModel = require("../models/Eps");
const DividendDetailModel = require("../models/DividendDetail");
const DividendInfoModel = require("../models/DividendInfo");
const DayInfoModel = require("../models/DayInfo");
const StockListModel = require("../models/StockList");
const YearHistoryModel = require("../models/YearHistory");
const helper = require("../utilities/helper");
const stockDetailService = require("./stockDetailService");

function accumulateEps(data) {
  return data.reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + parseFloat(currentValue.eps);
  }, 0);
}

// targetYear = 2022(明年)
async function predictV2(stockNo = "2451", targetYear) {
  let [epsData, dividendDetailData, dayInfoData, dividendInfoData, yearHistoryData, stockDetail] = await Promise.all([
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
  ]);
  if (!yearHistoryData) {
    yearHistoryData = { data: [] };
  }
  let pass5Year = [];
  //for each DividendDetail 去filter eps
  dividendDetailData.forEach((dividend) => {
    let epsYear = parseInt(dividend.year) - 1; //2021
    let dInfo = dividendInfoData.data.find((x) => x.year == dividend.year) || {};
    let yInfo = yearHistoryData.data.find((x) => x.year == dividend.year) || {};
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

  //targetYear的eps
  let epsYear = targetYear - 1; //2021
  let eps = epsData.data.filter((x) => x.year == epsYear);
  let totalEps = accumulateEps(eps); //計算該年度累積eps

  //預測先直接沿用去年的payout rate
  let prevPayoutRate = dividendDetailData[0].payoutRatio;
  let estimateDividend = (totalEps * prevPayoutRate).toFixed(2);

  let baseInfo = StockListModel.getNameByNo(stockNo);
  console.log("stockDetail", stockDetail);
  return {
    stockNo: stockNo,
    baseInfo: baseInfo,
    dayInfo: dayInfoData,
    stockDetail: stockDetail,
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

module.exports = {
  predict: predictV2,
};
