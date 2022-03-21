const { mongooseQuickSetup } = require("../utilities/helper");
const provider = require("../providers/kd.goodinfo");
const KDModel = require("../models/KD");

async function run() {
  mongooseQuickSetup(async () => {
    await DoWork();
  });
}

async function DoWork() {
  await KDModel.deleteMany({});
  let l = await KDModel.find().exec();
  console.log("total 1", l.length);
  await job(0);
  await job(1);
  await job(2);
  await job(3);
  await job(4);
  l = await KDModel.find().exec();
  console.log("total 2", l.length);
}

async function job(idx) {
  try {
    let data = await provider.getData(idx);
    await KDModel.insertMany(data);
    await delay();
    console.log(`${idx} success`);
  } catch (error) {
    console.log(`${idx} fail`);
  }
}

function delay() {
  return new Promise((res, rej) => {
    setTimeout(function () {
      res("continue");
    }, 1800);
  });
}

module.exports = { DoWork };

//node .\TestRun.js
