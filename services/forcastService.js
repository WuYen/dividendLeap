const EpsModel = require("../models/Eps");
const DividendDetailModel = require("../models/DividendDetail");
const helper = require("../utilities/helper");

// targetYear = 2022
async function predict(stockNo = 1604, targetYear) {
  let epsYear = targetYear - 1; //2021
  let epsYearPrev = targetYear - 2; //2020

  //取得個股所有 eps 資料
  let epsPromise = EpsModel.getData(stockNo);
  let dividendDetailPromise = DividendDetailModel.getData(stockNo);
  let [epsData, dividendDetailData] = await Promise.all([epsPromise, dividendDetailPromise]);
  let dividendDetailPrev = dividendDetailData.find((x) => x.year == epsYear);

  //Group by year
  let eps = epsData.data.filter((x) => x.year == epsYear);
  let epsPrev = epsData.data.filter((x) => x.year == epsYearPrev);

  //計算該年度累積eps
  let totalEps = accumulateEps(eps);
  let totalEpsPrev = accumulateEps(epsPrev);

  //預測先直接沿用去年的payout rate
  let prevPayoutRate = dividendDetailPrev.payoutRatio; //先寫死 => 要從 goodinfo 抓資料
  let estimateDividend = (totalEps * prevPayoutRate).toFixed(2);

  return {
    stockNo: stockNo,
    data: [
      {
        year: epsYear + 1,
        totalEps: totalEps,
        cashDividend: null,
        estimateDividend: helper.tryParseFloat(estimateDividend),
        q: eps,
        rate: prevPayoutRate,
      },
      {
        year: epsYearPrev + 1,
        totalEps: totalEpsPrev,
        cashDividend: dividendDetailPrev.cashDividen,
        estimateDividend: dividendDetailPrev.cashDividen,
        q: epsPrev,
        rate: prevPayoutRate,
      },
    ],
  };
}

function accumulateEps(data) {
  return data.reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + parseFloat(currentValue.eps);
  }, 0);
}

module.exports = {
  predict,
};
