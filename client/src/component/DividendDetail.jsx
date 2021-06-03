import React, { useEffect, useState } from "react";
import { formatDate } from "../utility/formatHelper";
import { dataAPI } from "../utility/config";
import { useParams } from "react-router-dom";

function DividendDetail(props) {
  const [data, setData] = useState(null);
  const { stockNo, name } = useParams();

  useEffect(() => {
    fetch(`${dataAPI}/v2/stock/detail/${stockNo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setData(data.data);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>名稱: {`${name} (${stockNo})`}</div>
      <div>除息日: {formatDate(data.dDate)}</div>
      <div>今年殖利率: {data.rate}%</div>
      <div>
        當前股價: {data.price}({formatDate(data.priceDate)})
      </div>
      <div>現金股利: {data.dCash}</div>
      <div>去年殖利率: {data.rateLY}%</div>
      <div>前五年平均殖利率: {data.rateAvg5}%</div>
      <div>前十年平均殖利率: {data.rateAvg10}%</div>
      <div>去年除息股價: {data.priceLY}</div>
      <div>去年除息日: {formatDate(data.dDateLY)}</div>
      <div>去年填滿息日: {formatDate(data.dFDayLY)}</div>
      <div>
        前年低點:
        {data.lowLY.map((data) => (
          <div>
            <div>{`${data.price} (${formatDate(data.date)})`}</div>
          </div>
        ))}
      </div>
      <div>
        去年高點:
        {data.HighLY.map((data) => (
          <div>{`${data.price} (${formatDate(data.date)})`}</div>
        ))}
      </div>
    </div>
  );
}

export default DividendDetail;
