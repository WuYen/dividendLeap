const { mongooseQuickSetup, latestTradeDate, today } = require("./utilities/helper");

const provider = require("./providers/yearHistory.twse");
const DayInfoModel = require("./models/DayInfo");
//const forecastService = require("./services/forecastService");
const dayInfoService = require("./services/dayInfoService");

const stockNo = "2451"; //創見

mongooseQuickSetup(async () => {
  //let data = await forecastService.predict(stockNo, 2022);
  //let data = await dayInfoService.getAllDayInfo();
  // let data = await DayInfoModel.provider3.getData({
  //   stockNo: stockNo,
  //   date: latestTradeDate(),
  // });
  let data = await dayInfoService.getAllDayInfoHighYield();
  console.log("result", data);
});

//node .\TestRun.js
