import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import api from "../../utility/api";

function News(props) {
  const today = new Date();
  const d1 = new Date();
  d1.setDate(today.getDate() - 1); //
  const d2 = new Date();
  d2.setDate(today.getDate() - 2); //

  return (
    <Box w="100%" d="flex">
      <DataGroup date={toDateString(today)} />
      <DataGroup date={toDateString(d1)} />
      <DataGroup date={toDateString(d2)} />
    </Box>
  );
}

function DataGroup(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(props.date).then(({ success, data }) => {
      success ? setData(data) : console.error("fetchData fail");
    });
  }, []);

  return (
    <div style={{ padding: "5px" }}>
      <h5>{props.date}</h5>
      {data.length == 0 ? (
        <div>Empty</div>
      ) : (
        data.map(({ link, title }, index) => {
          return (
            <div key={index} style={{ display: "block" }}>
              <a href={link} target="_blank">
                {title}
              </a>
            </div>
          );
        })
      )}
    </div>
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

function toDateString(date) {
  const { year, month, day } = getDateFragment(date);
  return `${year}${month}${day}`;
}

function getDateFragment(date) {
  return {
    year: date.getFullYear().toString(),
    month: `${("0" + (date.getMonth() + 1)).slice(-2)}`,
    day: `${("0" + date.getDate()).slice(-2)}`,
  };
}

export default News;
{
  /* 
  const inputRef = useRef();

  const [data, setData] = useState([]);
  const fetch = useCallback(() => {
    const date = inputRef.current;
    fetchData(date).then(({ success, data }) => {
      success ? setData(data) : console.error("fetchData fail");
    });
  }, []);

  useEffect(() => {
    fetch();
  }, []);
  <DateInput inputRef={inputRef} />
      <button onClick={fetch}>Search</button>

      {data.map(({ link, title }, index) => {
        return (
          <div key={index} style={{ display: "block" }}>
            <a href={link} target="_blank">
              {title}
            </a>
          </div>
        );
      })} */
}
