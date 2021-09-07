const { mongooseQuickSetup } = require("./utility/helper");
//const repository = require("./models/newsInfo/repository");
const service = require("./services/newsService");
//const source = require("./models/StockList/source");
const request = require("./utility/requestCore");

mongooseQuickSetup(async () => {
  // let data = await repository.update();
  await service.getByKeyword("現金股利");
  // console.log("result", data);
});

//node .\TestRun.js
