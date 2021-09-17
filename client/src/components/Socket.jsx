import React, { useCallback, useEffect, useState, useRef } from "react";
import useSocket from "../utils/useSocket";

export default function Socket(props) {
  const socket = useSocket();
  const [data, updateData] = useState(null);
  const keywordRef = useRef();

  const search = useCallback(() => {
    socket.emit("search", keywordRef.current.value, (response) => {
      console.log(response); // ok
      if (Array.isArray(response) && response.length > 0) {
        updateData(response);
      }
    });
  }, [updateData, socket]);

  useEffect(() => {
    if (socket) {
      const receiveHandler = (message) => {
        console.log("client receive " + message);
      };
      socket.on("message", receiveHandler);
      socket.on("receive", receiveHandler);
    }
    return () => {
      if (socket) {
        socket.off("message");
        socket.off("receive");
      }
    };
  }, [socket]);

  return (
    <div>
      <input style={{ border: "1px solid" }} ref={keywordRef}></input>
      <button onClick={search}>Search</button>
      <button onClick={() => socket.connect()}>Connect</button>
      <button onClick={() => socket.disconnect()}>Disconnect</button>
      <button
        onClick={() => {
          socket.emit("test", "TTTTest");
        }}
      >
        Send Test
      </button>
      {props.children(data)}
    </div>
  );
}
