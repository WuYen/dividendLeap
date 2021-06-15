const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function tryParseFloat(value) {
  let result = parseFloat(value.replace(/[^0-9\.]/g, ""));
  return isNaN(result) ? 0 : result;
}

function getTodayWithTZ() {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * 8);

  // return time as a string
  return nd;
}

function updateDate() {
  return getTodayWithTZ().toISOString().slice(0, 10).replace(/-/g, "");
}

function today() {
  return getTodayWithTZ().toISOString().slice(0, 10).replace(/-/g, "");
}

function latestTradeDate() {
  const today = getTodayWithTZ();
  const day = today.getDay();
  // Sunday - Saturday : 0 - 6
  if (day == 1) {
    //周一
    if (today.getHours() < 14) {
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
    if (today.getHours() < 14) {
      today.setDate(today.getDate() - 1);
    }
  }

  let result = today.toISOString().slice(0, 10).replace(/-/g, "");
  if (result == "20210614") {
    result = "20210611";
  }
  return result; //today.toISOString().slice(0, 10).replace(/-/g, "");
}

function toDateString(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
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
    process.exit(1);
  });
}

function parseChineseDate(str) {
  return `${+str.replace(/\D/g, "") + 19110000}`;
}

function getDateFragment(str) {
  return {
    year: str.substr(0, 4),
    month: str.substr(4, 2),
    day: str.substr(6, 2),
  };
}

function getPureDate(str) {
  return str.replace(/\D/g, "");
}

module.exports = {
  tryParseFloat,
  updateDate,
  today,
  mongooseQuickSetup,
  latestTradeDate,
  parseChineseDate,
  getDateFragment,
  getPureDate,
  toDateString,
};
