const dateTime = require("./dateTime");
const mongoose = require("mongoose");
const config = require("./config");

function tryParseFloat(value) {
  let result = value && parseFloat(value.replace(/[^0-9\.]/g, ""));
  return isNaN(result) ? 0 : result;
}

function mongooseQuickSetup(task) {
  mongoose.connect(config.MONGODB_URI || "mongodb://localhost/mern_youtube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", async () => {
    console.log("Mongoose is connected!!!!");
    let result = await task();
    console.log("mongooseQuickSetup finish");
    process.exit(1);
  });
}

module.exports = {
  ...dateTime,
  tryParseFloat,
  mongooseQuickSetup,
};
