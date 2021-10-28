const { mongooseQuickSetup } = require("./utility/helper");
const { getData, setData, updateData } = require("./models/UserInfo");
//const repository = require("./models/newsInfo/repository");
//const service = require("./services/newsService");
//const source = require("./models/StockList/source");
//const request = require("./utility/requestCore");

mongooseQuickSetup(async () => {
  // let data = await repository.update();
  // console.log("result", data);

  console.log("result", getData, setData, updateData);
});

//node .\TestRun.js
