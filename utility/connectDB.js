const mongoose = require("mongoose");

function connectMongo(URI, callBack) {
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!!");
  });

  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  toMongo: connectMongo,
};
