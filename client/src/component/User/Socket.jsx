import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export default function Socket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const sendMessage = useCallback(() => {
    if (socket) {
      socket.emit("message", "hello server");
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        console.log("client receive " + message);
      });
    }
  }, [socket]);

  return (
    <div>
      <button onClick={sendMessage}>To server</button>
    </div>
  );
}
