const { mongooseQuickSetup, latestTradeDate, today } = require("./utilities/helper");

const provider = require("./providers/yearHistory.twse");
//const Model = require("./models/DividendDetail");
const service = require("./services/dayInfoService");

const stockNo = "2451"; //創見

mongooseQuickSetup(async () => {
  let data = await service.getAllDayInfoFixed();
  // let data = await service.getAllDayInfoFixed();
  console.log("result", data);
});

//node .\TestRun.js
