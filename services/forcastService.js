const epsRepository = require("../models/eps/repository");
const helper = require("../utility/helper");

// targetYear = 2022
async function predict(stockNo = 1604, targetYear) {
  let epsYear = targetYear - 1; //2021
  let epsYearPrev = targetYear - 2; //2020

  //取得個股所有 eps 資料
  let { data } = await epsRepository.getData(stockNo);

  //Group by year
  let eps = data.filter((x) => x.year == epsYear);
  let epsPrev = data.filter((x) => x.year == epsYearPrev);

  //計算該年度累積eps
  let totalEps = accumulateEps(eps);
  let totalEpsPrev = accumulateEps(epsPrev);

  //預測先直接沿用去年的payout rate
  let prevPayoutRate = 0.9; //先寫死 => 要從 goodinfo 抓資料
  let estimateDividend = (totalEps * prevPayoutRate).toFixed(2);

  return {
    stockNo: stockNo,
    data: [
      {
        year: epsYear,
        totalEps: totalEps,
        cashDividend: helper.tryParseFloat(estimateDividend),
        q: eps,
        rate: prevPayoutRate,
      },
      { year: epsYearPrev, totalEps: totalEpsPrev, cashDividend: 2.55, q: epsPrev, rate: prevPayoutRate },
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

/**
 * Get last 5 year avg payout ratio(from goodinfo)
 * @param {Number} stockNo
 * @param {Number} targetYear
 * @returns
 */
// async function getAvgPayoutRatio(stockNo, targetYear) {
//   let link = `https://goodinfo.tw/StockInfo/StockDividendPolicy.asp?STOCK_ID=${stockNo}`;

//   const $ = await requestCore.getHTML(link);

//   let rawData = parseRawData($);

//   //convert html document to data
//   function parseRawData($) {
//     let result = [];
//     $("#divDetail table tr[align='center']").each(function () {
//       let columns = $(this).find("td");
//       let year = columns.first().text();
//       let ratio = columns.last().text();
//       result.push({ year, ratio });
//     });
//     return result;
//   }

//   let sumRatio = 0;
//   let count = 0;
//   rawData.forEach(({ year, ratio }) => {
//     if (+year < targetYear && +year >= targetYear - 5) {
//       let r = parseFloat(ratio);
//       if (r) {
//         sumRatio += r;
//         count++;
//       }
//     }
//   });

//   let avgRatio = parseFloat((sumRatio / count).toFixed(2));
//   console.log("avgRatio", avgRatio);
//   return avgRatio;
// }

// async function predict(stockNo = 1604, targetYear) {
//   //targetYear-1的eps加總 可以推算出targetYear的現金股利
//   let previousYear = targetYear - 1;
//   //算出全年度的EPS
//   let data = await epsRepository.getData(stockNo);
//   let eps2020 = data.filter((x) => x.year == previousYear);
//   let totalEPS = eps2020.reduce((accumulator, currentValue, currentIndex, array) => {
//     return accumulator + parseFloat(currentValue.eps);
//   }, 0);
//   console.log("totalEPS", totalEPS);

//   //取得盈餘分配%
//   let avgPayoutRatio = await getAvgPayoutRatio(stockNo, targetYear);

//   //預估明年股利 = 今年EPS * 盈餘分配率
//   let estimate = (totalEPS * avgPayoutRatio) / 100;
//   console.log("estimate", estimate);
//   return estimate;
// }

// //pre-condition 連續五年配發股利
// predict(1515, 2021);
