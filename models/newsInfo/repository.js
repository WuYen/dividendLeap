const Model = require("./model");

async function getData(query) {
  if (query.start && query.end) {
    return await getByRange(query);
  }
  let data = await Model.find(query).exec(); //{ updateDate: "yyyyMMdd" };

  return data;
}

async function getByRange({ start, end }) {
  let result = await Model.aggregate([
    { $match: { updateDate: { $gte: start, $lte: end } } },
    {
      $group: {
        _id: "$updateDate",
        date: "$updateDate",
        news: { $push: "$$ROOT" },
      },
    },
  ]).exec();

  return result;
}

async function saveData(data) {
  let result = await Model.insertMany(data);
  return result;
}

module.exports = {
  getData,
  saveData,
  entity: Model,
};
