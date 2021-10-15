const mongoose = require("mongoose");

function connectMongo(URI) {
  console.log("connect to Mongo " + URI);
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!!");
  });

  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function disconnectMongo() {
  return mongoose.disconnect();
}

module.exports = {
  mongoose: mongoose,
  toMongo: connectMongo,
  disconnect: disconnectMongo,
};
