import React, { useState, useRef, useEffect } from "react";
import { api } from "../../utils";
import { Loading } from "./DataList";

export default function FinMindNews(props) {
  const { stockNo } = props;
  const [list, setList] = useState([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    api
      .get(`/news/stock/${stockNo}`)
      .then((data) => {
        console.log("fetchData result", data);
        return data;
      })
      .then(({ success, data }) => {
        isLoaded.current = true;
        success && setList(data);
      });
  }, [stockNo]);

  return isLoaded.current ? props.children(list) : <Loading />;
}
