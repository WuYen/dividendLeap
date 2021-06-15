import React, { useEffect, useState } from "react";
import { formatDate } from "../utility/formatHelper";
import { dataAPI } from "../utility/config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DividendDetail(props) {
  const [data, setData] = useState(null);
  const { stockNo, name } = useParams();

  useEffect(() => {
    fetch(`${dataAPI}/stock/detail/${stockNo}`)
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
      <div>
        <Link to="/">回列表</Link>
      </div>
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
        <HistoryPrice data={data.lowLY} />
      </div>
      <div>
        前年高點:
        <HistoryPrice data={data.HighLY} />
      </div>
    </div>
  );
}

function HistoryPrice(props) {
  return props.data.map((item, index) => {
    return item ? (
      <div key={item.date}>{`${item.price} (${formatDate(item.date)})`}</div>
    ) : (
      <div key={index}>--</div>
    );
  });
}

export default DividendDetail;
