import io from "socket.io-client";
import { socketAPI } from "./config";

function socketManager(url) {
  const socket = io(socketAPI);
  socket.on("connect", () => {
    console.log("socket connect");
  });

  return {
    connect: () => {
      socket.connect();
    },
    disconnect: () => {
      socket.disconnect();
    },
    emit: () => {
      throw new Error("Not implement");
    },
    get socket() {
      if (socket.connected) {
        return socket;
      } else {
        throw new Error("not connect");
      }
    },
  };
}

const socket = socketManager();

export default socket;
