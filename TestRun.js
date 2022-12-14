const { mongooseQuickSetup, latestTradeDate, today } = require('./utilities/helper');

const provider = require('./providers/kd.goodinfo');
const fugleProvider = require('./providers/fugle.api');
const ScheduleModel = require('./models/Schedule');
const MyStockModel = require('./models/MyStock');
const EpsModel = require('./models/Eps');
const dayInfoService = require('./services/dayInfoService');
const forecastService = require('./services/forecastService');
//const dayInfoService = require("./services/dayInfoService");

const stockNo = '2451'; //創見

mongooseQuickSetup(async () => {
  //  let result = await EpsModel.resetAll();
  const result = await ScheduleModel.update0056();
  // const result = await forecastService.rebuildData();
  // const result = await EpsModel.find({
  //   updateDate: '20220531',
  // }).distinct('stockNo');
  console.log('ScheduleModel update0056', result);
});
// fugleProvider.chartSocket();

//node .\TestRun.js

async function updateMyStock(params) {
  const result = await MyStockModel.findOne({ account: 'Yen' }).exec();
  console.log('result', result);
  result.list.forEach(function (item) {
    item.type = '我的清單';
  });
  var rr = await result.save();
  console.log('result', rr);
}
