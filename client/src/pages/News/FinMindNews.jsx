import React, { useState, useRef, useEffect } from "react";
import { api } from "../../utils";

export default function FinMindNews(props) {
  const [list, setList] = useState([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (date) {
      api
        .get(`/news/stock/${props.stockNo}`)
        .then((data) => {
          console.log("fetchData result", data);
          return data;
        })
        .then(({ success, data }) => {
          isLoaded.current = true;
          success && setList(data);
        });
    }
  }, [stockNo]);

  return isLoaded.current ? props.children(list) : <div>Loading...</div>;
}
