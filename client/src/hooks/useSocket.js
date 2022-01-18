import { useEffect, useState } from "react";
import io from "socket.io-client";
import { socketAPI } from "../utils/config";
import auth from "../utils/auth";

let socketInstance = null;

export default function useSocket(props) {
  if (socketInstance == null && auth.isLogin) {
    var userId = auth.context.account; // Retrieve userId
    socketInstance = io(socketAPI, {
      extraHeaders: {
        "user-id": userId,
      },
    });
    console.log("socketInstance", userId, socketInstance.connected, socketInstance.id);
  }

  return socketInstance;
}
