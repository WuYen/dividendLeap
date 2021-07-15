const { mongooseQuickSetup } = require("./utility/helper");
//const model = require('./models/dividendSchedule/repository')
//const service = require('./services/dayInfoService')
const source = require("./models/StockList/source");
const request = require("./utility/requestCore");

mongooseQuickSetup(async () => {
  // try get data from https://pchome.megatime.com.tw/post/sto0/3
  // const result = await request.postHTML(
  //   "https://pchome.megatime.com.tw/post/sto0/3"
  // );

  await source.getData();

  // let data = await getData();
  // console.log("getData result", data);
  // let result = await getByStockNo("1215");
  // console.log("getByStockNo result", result);
  //let result = await insert();
  //return result;
});

//node .\TestRun.js
