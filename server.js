const express = require("express");
const connectDB = require("./utility/connectDB");
const config = require("./utility/config");
const path = require("path");
const { getByKeyword } = require("./services/newsService");

const app = express();
app.use(require("./utility/middleware"));
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
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", function (socket) {
    console.log("A user connected", socket.id);

    socket.on("search", async function (keyword, callback) {
      console.log("server receive from " + socket.id + " " + keyword);
      let data = await getByKeyword(keyword, true);
      callback(data);
    });

    socket.on("test", async function (msg) {
      console.log("server receive msg " + msg);
      socket.emit("receive", "hihi"); //send message to self
    });

    socket.on("disconnect", function () {
      console.log("A user disconnected");
    });
  });

  const PORT = config.PORT || 8080;
  server.listen(PORT, console.log(`Server is starting at ${PORT}`));
}

start();
