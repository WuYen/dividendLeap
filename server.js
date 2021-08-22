const express = require("express");
const connectDB = require("./utility/connectDB");
const config = require("./utility/config");
const path = require("path");

const app = express();
app.use(require("./middleware"));
app.use(require("./routes"));

if (config.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

async function start() {
  await connectDB.toMongo(
    config.MONGODB_URI || "mongodb://localhost/mern_youtube"
  );

  const server = require("http").createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", function (socket) {
    console.log("A user connected");

    socket.on("message", function (message) {
      console.log("server receive " + message);
      socket.emit("message", "hi client");
    });

    socket.on("disconnect", function () {
      console.log("A user disconnected");
    });
  });

  const PORT = config.PORT || 8080;
  server.listen(PORT, console.log(`Server is starting at ${PORT}`));
}

start();
