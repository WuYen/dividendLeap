const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function tryParseFloat(value) {
  let result = parseFloat(value);
  return isNaN(result) ? 0 : result;
}

function updateDate() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
}

function today() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
}

function latestTradeDate() {
  const today = new Date();
  const day = today.getDay();
  // Sunday - Saturday : 0 - 6
  if (day == 1) {
    //周一
    if (today.getHours() < 16) {
      today.setDate(today.getDate() - 3); // -3 => 週五
    }
  } else if (day == 0) {
    //週日
    today.setDate(today.getDate() - 2); // -2 => 週五
  } else if (day == 6) {
    //週六
    today.setDate(today.getDate() - 1); // -2 => 週五
  } else {
    //周一 ~ 周五
    if (today.getHours() < 16) {
      today.setDate(today.getDate() - 1);
    }
  }

  return today.toISOString().slice(0, 10).replace(/-/g, "");
}

function mongooseQuickSetup(task) {
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/mern_youtube",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.on("connected", async () => {
    console.log("Mongoose is connected!!!!");
    let result = await task();
    console.log("finish");
  });
}

module.exports = {
  tryParseFloat,
  updateDate,
  today,
  mongooseQuickSetup,
  latestTradeDate,
};
