const DividendSchedule = require("./model");
const {
  tryParseFloat,
  mongooseQuickSetup,
  parseChineseDate,
} = require("../../utility/helper");
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
      //{ $project: { "data.stockNo": 1, "data.date": 1 } }, //like select choose field you want
      // { $group: { _id: "$_id", subDocument: { $push: "$L.N" } } },
    ]).exec();

    //result will be like
    //unwind 讓data[record,record...] => data{record}
    //   [
    //     _id: 60c1ecfc85efb40017c9cbec,
    //     data: {
    //       _id: 60c1ecfc85efb40017c9cbf0,
    //       stockNo: '1215',
    //       stockName: '卜蜂',
    //       year: '2021',
    //       date: '20210628',
    //       cashDividen: 4.5
    //     },
    //     updateDate: '20210610',
    //     __v: 0
    //   }
    // ]

    //with  { $project: { "data.stockNo": 1, "data.date": 1 } }, 挑選要得field
    // [
    //   {
    //     _id: 60c1ecfc85efb40017c9cbec,
    //     data: { stockNo: '1215', date: '20210628' }
    //   }
    // ]

    return result[0].data;
  } catch (error) {
    var whatsWrong = error;
    return error;
  }
}

// mongooseQuickSetup(async () => {
//   let result = await getByStockNo("1215");
//   console.log("getByStockNo result", result);
//   return result;
// });

module.exports = {
  getData,
  update,
  getByStockNo,
  entity: DividendSchedule,
};
