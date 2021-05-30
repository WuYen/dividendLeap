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
};
