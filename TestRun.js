const { mongooseQuickSetup } = require("./utility/helper");
//const repository = require("./models/dividendDetail/repository");
const service = require("./services/forcastService");
//const source = require("./models/StockList/source");
//const request = require("./utilities/requestCore");

mongooseQuickSetup(async () => {
  let data = await service.predict(2451, 2022);
  console.log("result", data);
});

//node .\TestRun.js
