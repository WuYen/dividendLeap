const { mongooseQuickSetup, latestTradeDate, today } = require("./utilities/helper");

//const Model = require("./models/DividendDetail");
//const service = require("./services/forcastService");
//const source = require("./models/StockList/source");
//const request = require("./utilities/requestCore");
//const provider = require("./providers/eps.want");

const stockNo = "2881"; //創見

mongooseQuickSetup(async () => {
  // let data = await service.predict("2881", "2021");
  // console.log("result", data);
});

//node .\TestRun.js
