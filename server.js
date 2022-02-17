const express = require("express");
const connectDB = require("./utilities/connectDB");
const config = require("./utilities/config");
const socketManager = require("./utilities/socketManager");
const path = require("path");

const app = express();
app.use(require("./utilities/middleware"));
app.use(require("./contrtollers"));

if (config.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

async function start() {
  await connectDB.toMongo(config.MONGODB_URI || "mongodb://localhost/mern_youtube");
  const server = require("http").createServer(app);
  socketManager.create(server);
  const PORT = config.PORT || 8080;
  server.listen(PORT, console.log(`Server is starting at ${PORT}`));
}

start();
