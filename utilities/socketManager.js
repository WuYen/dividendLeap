const socketIO = require("socket.io");
// const realTimeService = require("../services/realTimeService");

let instance = null;
let onlineList = new Map();

function create(server) {
  instance = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  instance.on("connection", function (socket) {
    const userId = socket.handshake.headers["user-id"];
    if (userId) {
      join(userId, socket);
      regisChannel(userId, socket);
      leave(userId, socket);
    } else {
      console.log("unauthorized connecting");
    }
  });
}

function regisChannel(userId, socket) {
  socket.on("search", async function (keyword, callback) {
    console.log("server receive from " + socket.id + " " + keyword);
    let data = await getByKeyword(keyword, true);
    callback(data);
  });

  socket.on("watch", async function (stockNo) {
    // realTimeService.watch(stockNo);
  });

  socket.on("test", async function (msg) {
    console.log("server receive msg " + msg);
    socket.emit("receive", "hihi"); //send message to self
  });
}

function join(userID, socket) {
  console.log("A user connected", userID, socket.id);
  onlineList.set(userID, socket.id);
  console.log("user list[join]", [...onlineList.keys()]);
}

function leave(userID, socket) {
  socket.on("disconnect", function () {
    console.log("A user disconnected", userID, socket.id);
    onlineList.delete(userID);
    //realTimeService.unWatch(stockNo);
    console.log("user list[leave]", [...onlineList.keys()]);
  });
}

module.exports = {
  create,
  instance,
  send: (userId, payload) => {
    var socketId = onlineList.get(userId);
    if (socketId) {
      console.log("send private message to:" + userId);
      instance.to(socketId).emit("receive", payload);
    } else {
      console.log("member:" + userId + " not in onlineList");
    }
  },
};
