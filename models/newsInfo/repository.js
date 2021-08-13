const Model = require("./model");

async function getData(query) {
  let data = await Model.find(query).exec(); //{ updateDate: "yyyyMMdd" };

  return data;
}

// async function update() {
//   let data = await Model.updateMany({}, { category: "現金股利" });
//   return data;
// }

async function saveData(data) {
  let result = await Model.insertMany(data);
  return result;
}

module.exports = {
  getData,
  saveData,
  entity: Model,
};
