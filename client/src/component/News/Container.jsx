import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import api from "../../utility/api";

function News(props) {
  const [data, setData] = useState([]);
  const inputRef = useRef();
  const fetch = useCallback(() => {
    const date = inputRef.current;
    fetchData(date).then(({ success, data }) => {
      success ? setData(data) : console.error("fetchData fail");
    });
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box w="100%">
      <DateInput inputRef={inputRef} />
      <button onClick={fetch}>Search</button>

      {data.map(({ link, title }, index) => {
        return (
          <div key={index} style={{ display: "block" }}>
            <a href={link} target="_blank">
              <h6>{title}</h6>
            </a>
          </div>
        );
      })}
    </Box>
  );
}

function DateInput(props) {
  const [text, setText] = useState("20210729");
  useEffect(() => {
    props.inputRef.current = text;
  }, [text]);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
}

function fetchData(date) {
  return api.get(`/news/${date}`).then((data) => {
    console.log("fetchData result", data);
    return data;
  });
}

export default News;
