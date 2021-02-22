import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { helper } from "../utility";

function Detail(props) {
  let { stockNo } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${helper.APIKey}/stock/detail/${stockNo}`)
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [stockNo]);

  console.log("data", data);
  return (
    <div>
      <h1>Detail page {stockNo}</h1>
      <div>
        {data?.map((row, idx) => {
          return (
            <div key={idx}>
              年度:{row.year0}
              現金股利盈餘:{row.cash0}
              現金股利公積:{row.cash1}
              現金股利合計:{row.cash2}
              股票股利盈餘:{row.stock0}
              股票股利公積:{row.stock1}
              股票股利合計:{row.stock2}
              股利合計:{row.dividendTotal}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Detail;
