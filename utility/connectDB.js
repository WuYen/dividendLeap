const mongoose = require("mongoose");

function connectMongo(URI, callBack) {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!!");
    callBack();
  });
}

module.exports = {
  toMongo: connectMongo,
};
