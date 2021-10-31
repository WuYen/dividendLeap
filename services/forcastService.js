const EpsModel = require("../models/Eps");
const DividendDetailModel = require("../models/DividendDetail");
const DayInfoModel = require("../models/DayInfo");
const StockListModel = require("../models/StockList");
const helper = require("../utilities/helper");

function accumulateEps(data) {
  return data.reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + parseFloat(currentValue.eps);
  }, 0);
}

// targetYear = 2022
async function predict(stockNo = "2451", targetYear) {
  //先抓過去五年的DividendDetail
  let dividendDetailPromise = DividendDetailModel.getByRange({
    stockNo,
    start: `${targetYear - 5}`,
    end: `${targetYear - 1}`,
  });

  let dayInfoPromise = DayInfoModel.getData({ stockNo, date: helper.latestTradeDate() });
  let epsPromise = EpsModel.getData(stockNo); //eps 資料全撈
  let [epsData, dividendDetailData, dayInfoData] = await Promise.all([
    epsPromise,
    dividendDetailPromise,
    dayInfoPromise,
  ]);

  let pass5Year = [];
  //for each DividendDetail 去filter eps
  dividendDetailData.forEach((dividend) => {
    let epsYear = parseInt(dividend.year) - 1; //2021
    pass5Year.push({
      year: dividend.year,
      totalEps: dividend.eps,
      cashDividend: dividend.cashDividen,
      estimateDividend: null,
      q: epsData.data.filter((x) => x.year == epsYear),
      rate: dividend.payoutRatio,
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
  return {
    stockNo: stockNo,
    baseInfo: baseInfo,
    dayInfo: dayInfoData,
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

/*
  baseInfo: [ '2881', '富邦金', '富邦金融控股股份有限公司', ',0_17,2_2821,3_C428,4_A210,' ],
  dayInfo: {
    _id: 617d56fb553a152bc43ff78b,
    stockNo: '2881',
    date: '20211029',
    year: '2021',
    month: '10',
    price: 73.6,
    count: 33197,
    updateDate: '20211030',
    __v: 0
  },
 */

module.exports = {
  predict,
};
