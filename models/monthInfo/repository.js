// const MonthInfo = require("./model");
// const helper = require("../../utility/requestCore");
// const {
//   tryParseFloat,
//   today,
//   mongooseQuickSetup,
// } = require("../../utility/helper");

// const url = (stockNo, date) =>
//   `https://www.twse.com.tw/exchangeReport/FMSRFK?response=json&date=${date}&stockNo=${stockNo}`;

// async function getData(stockNo = 2412, date = "20200101") {
//   const rawData = await helper.fetch(url(stockNo, date));

//   let processedData = processData(rawData);

//   let entity = {
//     stockNo: stockNo,
//     year: "2020",
//     monthInfo: [...processedData],
//     updateDate: today(),
//   };

//   const monthInfo = new MonthInfo(entity);

//   let result = await monthInfo.save();
//   console.log(`save schedule success`, result);
//   return processedData;
// }

// const field = {
//   year: 0, // "年度",
//   month: 1, // "月份"
//   high: 2, // "最高價",
//   low: 3, // "最低價",
//   avg: 4, // "加權(A/B)平均價",
//   transition: 5, // "成交筆數",
//   amount: 6, // "成交金額(A)",
//   count: 7, // "成交股數(B)",
//   turnover: 8, // "週轉率(%)",
// };

// //把raw data 轉換成 mongo 要的格式
// function processData(source) {
//   let result = source.data.map((data) => {
//     return {
//       key: data[field.month],
//       value: tryParseFloat(data[field.avg]),
//     };
//   });

//   return result;
// }

// //execute function after mongoose connected
// // node .\models\monthInfo\service.js
// //mongooseQuickSetup(getData);
