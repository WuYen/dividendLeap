import React, { useCallback, useEffect, useState, useRef } from "react";
import io from "socket.io-client";

export default function Socket(props) {
  const [socket, setSocket] = useState(null);
  const [data, update] = useState([]);
  const keywordRef = useRef();

  useEffect(() => {
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const search = useCallback(() => {
    console.log("search", keywordRef.current.value);
    if (socket) {
      socket.emit("search", keywordRef.current.value, (response) => {
        console.log(response); // ok
        update(response);
      });
    }
  }, [socket, update]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        console.log("client receive " + message);
      });
    }
  }, [socket]);

  return (
    <div>
      <input style={{ border: "1px solid" }} ref={keywordRef}></input>
      <button onClick={search}>Search</button>
      {props.children(data)}
    </div>
  );
}
