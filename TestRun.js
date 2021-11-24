const { mongooseQuickSetup, latestTradeDate, today } = require("./utilities/helper");

const provider = require("./providers/yearHistory.twse");
//const Model = require("./models/DividendDetail");
const service = require("./services/forcastService");

const stockNo = "2451"; //創見

mongooseQuickSetup(async () => {
  let data = await service.predictV2("5309", 2022);
  // let data = await service.getAllDayInfoFixed();
  console.log("result", data);
});

//node .\TestRun.js
