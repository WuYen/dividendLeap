const DividendSchedule = require("./model");
const source = require("./source.twse");

async function getData() {
  let data = await DividendSchedule.find()
    .sort({ updateDate: -1 })
    .limit(1)
    .exec();
  if (data.length == 1) {
    return data[0];
  } else {
    let data = await source.getData();
    return data;
  }
}

async function update() {
  let data = await source.getData();
  return data;
}

async function getByStockNo(stockNo) {
  try {
    let result = await DividendSchedule.aggregate([
      { $sort: { updateDate: -1 } }, //找到最新一筆    取代 { $match: { updateDate: "20210610" } },
      { $limit: 1 },
      {
        $unwind: "$data", //把Array資料攤平
      },
      { $match: { "data.stockNo": stockNo } }, //查詢條件
    ]).exec();

    return result[0].data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getData,
  update,
  getByStockNo,
  entity: DividendSchedule,
};
