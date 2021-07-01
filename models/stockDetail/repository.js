const Model = require("./model");
const { today } = require("../../utility/helper");

async function getData(query) {
  //query => { stockNo, date }
  let isExpire = false;
  let data = await Model.findOne({ stockNo: query.stockNo }).exec();
  data && (isExpire = data.priceData !== query.priceData);

  return { data, isExpire };
}

async function saveData(data) {
  await Model.deleteOne({ stockNo: data.stockNo });

  let model = new Model({ ...data, updateDate: today() });

  await model.save();
}

//cache stock detail value
module.exports = {
  getData: getData,
  saveData: saveData,
  entity: Model,
};
