const mongoose = require('mongoose');
//const provider = require("../providers/eps");
const provider = require('../providers/eps.histock');
const { delay, getRandomIntInclusive } = require('../utilities/delay');

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  'Eps', // eps history from yahoo
  new Schema({
    stockNo: String,
    data: [
      {
        year: String, //年度 "2021"
        date: String, // "2021 Q2"
        quarter: String, // 季度 1、2、3、4
        eps: Number, // 0.42 小數點兩位
      },
    ],
    updateDate: String,
  })
);

async function getData(stockNo) {
  const query = { stockNo: stockNo };
  let data = await Model.findOne(query).exec();
  if (!data) {
    let entity = await provider.getData(stockNo);
    data = await new Model(entity).save();
  }
  return data;
}

async function reset(stockNo) {
  await Model.deleteOne({ stockNo });
  let entity = await provider.getData(stockNo);
  await new Model(entity).save();
}

async function resetAll(stockNo) {
  const chunkSize = 20;
  const data = await Model.find({
    updateDate: { $lte: '20220530' },
  }).distinct('stockNo');
  const totalCount = data.length;

  for (let g = 0; g < Math.ceil(totalCount / chunkSize); g++) {
    let groupData = [];
    let deleteItems = [];
    for (let index = g * chunkSize; index < (g + 1) * chunkSize; index += 1) {
      try {
        const stockNo = data[index];
        if (stockNo) {
          console.log('stockNo', stockNo);
          let result = await provider.getData(stockNo);
          groupData.push(result);
          deleteItems.push(stockNo);
          delay(getRandomIntInclusive(600, 1600));
        }
      } catch (e) {
        console.log('get eps error', e);
      }
    }

    await Model.deleteMany({ stockNo: { $in: deleteItems } });
    await Model.insertMany(groupData);
    await delay(getRandomIntInclusive(2000, 4000));
  }
}

// await EpsModel.deleteMany({
//   stockNo: {
//     $in: ["2412"],
//   },
// });

module.exports = Model;
module.exports.getData = getData;
module.exports.reset = reset;
module.exports.resetAll = resetAll;
