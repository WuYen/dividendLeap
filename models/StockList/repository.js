const StockList = require("./model");

async function getData(stockNo) {
  if (stockNo) {
    let data = await StockList.findOne({ stockNo: stockNo }).exec();
    return data;
  } else {
    let data = await StockList.find().exec();
    return data;
  }
}

module.exports = {
  getData: getData,
  entity: StockList,
};
