import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../utils/api";
import Loading from "../../components/Loading";
import Content from "./Content";

export default function DividendDetail(props) {
  const { stockNo, name } = useParams();
  const [pageInfo, setPageInfo] = useState({
    isLoading: true,
    hasError: false,
    data: null,
    stockNo,
    name,
  });

  useEffect(() => {
    api.get(`/schedule/detail/${stockNo}`).then((data) => {
      console.log("data", data);
      if (data.success) {
        setPageInfo({
          stockNo,
          name,
          isLoading: false,
          data: data.data,
        });
      } else {
        setPageInfo({
          stockNo,
          name,
          isLoading: false,
          data: null,
          hasError: true,
        });
      }
    });
  }, [stockNo]);

  return pageInfo.isLoading ? (
    <Loading />
  ) : pageInfo.hasError ? (
    <div>Data not available</div>
  ) : (
    <Content {...pageInfo} />
  );
}
