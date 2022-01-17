const { mongooseQuickSetup, latestTradeDate, today } = require("./utilities/helper");

const provider = require("./providers/kd.goodinfo");
const fugleProvider = require("./providers/fugle.api");
const ScheduleModel = require("./models/Schedule");
const MyStockModel = require("./models/MyStock");
const dayInfoService = require("./services/dayInfoService");
//const dayInfoService = require("./services/dayInfoService");

const stockNo = "2451"; //創見

mongooseQuickSetup(async () => {
  //  const schedule = await ScheduleModel.getData();
  await fugleProvider.chart();
});
//fugleProvider.chartSocket();

//node .\TestRun.js

async function updateMyStock(params) {
  const result = await MyStockModel.findOne({ account: "Yen" }).exec();
  console.log("result", result);
  result.list.forEach(function (item) {
    item.type = "我的清單";
  });
  var rr = await result.save();
  console.log("result", rr);
}
