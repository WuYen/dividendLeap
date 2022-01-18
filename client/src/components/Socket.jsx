import React, { useCallback, useEffect, useState, useRef } from "react";
import useSocket from "../hooks/useSocket";
import auth from "../utils/auth";

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
  const style = { padding: "5px", border: "1px solid black", margin: "2px" };
  return (
    <div>
      {/* <input style={style} ref={keywordRef}></input>
      <button style={style} onClick={search}>
        Search
      </button> */}
      <button style={style} onClick={() => socket.connect()}>
        Connect
      </button>
      <button style={style} onClick={() => socket.disconnect()}>
        Disconnect
      </button>
      <button
        style={style}
        onClick={() => {
          socket.emit("test", "TTTTest");
        }}
      >
        Send Test
      </button>
    </div>
  );
}
