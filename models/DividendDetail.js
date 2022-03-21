const mongoose = require("mongoose");
const provider = require("../providers/dividendDetail");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "DividendDetail",
  new Schema({
    stockNo: String,
    year: String, //除息年度 2019
    cashDividen: Number, //現金股利0.4
    cashDividenCapital: Number, //現金公積股利0.4
    cashDividenTotal: Number, //現金股利合計
    eps: Number, //EPS
    payoutRatio: Number, // payoutRatio = cashDividen/EPS
    updateDate: String,
  })
);

async function getData(stockNo) {
  let data = await Model.find({ stockNo }).exec();
  if (data.length == 0) {
    data = await provider.getData(stockNo);
    await Model.deleteMany({ stockNo });
    await Model.insertMany(data);
  }
  return data;
}

async function reset(stockNo) {
  await Model.deleteMany({ stockNo });
  let data = await provider.getData(stockNo);
  await Model.insertMany(data);
}

/**
 * 取得區間內的Dividend detail by stockNo
 * @param {Object} query { stockNo, start, end }
 * @returns
 */
async function getByRange(query) {
  const { stockNo, start, end } = query;
  let result = await Model.aggregate([
    { $match: { year: { $gte: start, $lte: end }, stockNo } },
    {
      $sort: { year: -1 },
    },
  ]).exec();

  if (result.length == 0) {
    let data = await getData(stockNo);
    result = data.filter((x) => parseInt(x.year) >= start && parseInt(x.year) <= end);
  }

  return result;
}

module.exports = Model;
module.exports.getData = getData;
module.exports.getByRange = getByRange;
module.exports.reset = reset;

//Combine DividendDetail and DividendInfoV2 to single model
// 除息年度
// 除息日期
// 除權息前股價
// 填息天數
// 填息日期

// EPS
// 現金股利
// 分配率
// 現金殖利率

// 公積股利
// 公積+現金股利
// 公積+現金股利合計殖利率

// 股票股利
// 股票殖利率

// 合計殖利率
