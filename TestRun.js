const { mongooseQuickSetup, latestTradeDate, today } = require("./utilities/helper");

const provider = require("./providers/kd.goodinfo");
const ScheduleModel = require("./models/Schedule");
const MyStockModel = require("./models/MyStock");
const dayInfoService = require("./services/dayInfoService");
//const dayInfoService = require("./services/dayInfoService");

const stockNo = "2451"; //創見

mongooseQuickSetup(async () => {
  //  const schedule = await ScheduleModel.getData();
  const result = await MyStockModel.find({ account: "josh" }).distinct("list.type");

  console.log("result", result);
});

//node .\TestRun.js
