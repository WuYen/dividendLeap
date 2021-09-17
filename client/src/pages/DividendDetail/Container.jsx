import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../utils/api";
import Loading from "../../components/Loading";
import Content from "./Content";

export default function DividendDetail(props) {
  const { stockNo, name } = useParams();
  const [pageInfo, setPageInfo] = useState({
    isLoading: true,
    data: null,
    stockNo,
    name,
  });

  useEffect(() => {
    api.get(`/stock/detail/${stockNo}`).then((data) => {
      console.log("data", data);
      setPageInfo({
        stockNo,
        name,
        isLoading: false,
        data: data.data,
      });
    });
  }, [stockNo]);

  return pageInfo.isLoading ? <Loading /> : <Content {...pageInfo} />;
}
