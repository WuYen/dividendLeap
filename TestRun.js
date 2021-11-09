const { mongooseQuickSetup, latestTradeDate, today } = require("./utilities/helper");

const provider = require("./providers/dayInfo.finMind");
//const Model = require("./models/DividendDetail");
//const service = require("./services/stockDetailService");

const stockNo = "2451"; //創見

mongooseQuickSetup(async () => {
  // let data = await service.buildData(stockNo, 2021, latestTradeDate());
  let data = await provider.getData({ stockNo, date: latestTradeDate() });
  // console.log("result", data);
});

//node .\TestRun.js
