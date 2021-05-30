import React, { useEffect, useState, useMemo } from "react";
import { helper } from "../utility";
import { dataAPI } from "../utility/config";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function MainContent(props) {
  const [data, setData] = useState(null);
  let { stockNo, name } = useParams();
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

  // let result = {
  //   stockNo: stockNo,
  //   dDate: "除息日",
  //   rate: "今年殖利率%",
  //   price: "當前股價",
  //   dCash: "現金股利",
  //   rateLY: dInfoLY.yieldRateCash + "%", //"去年殖利率%",
  //   rateAvg5: (total5 / last5.length).toFixed(2) + "%", //"前五年平均殖利率%",
  //   rateAvg10: (total10 / last10.length).toFixed(2) + "%", //"前十年平均殖利率%",
  //   priceLY: dInfoLY.value || "N/A", // "去年除息股價",
  //   dDateyLY: dInfoLY.date || "N/A", // "去年除息日",
  //   dFDayLY:
  //     `${parseDate(dInfoLY.fillDate)}` ||
  //     "N/A" + (!isNaN(dInfoLY.fillDay) ? `(${dInfoLY.fillDay}天)` : ""), //"去年填滿息日",
  //   lowLY: [{ price: "TODO", date: "TODO" }],
  //   HighLY: [{ price: "TODO", date: "TODO" }],
  // };

  return (
    <div>
      <div>名稱:{name}</div>
      <div>除息日:{data.dDate}</div>
      <div>今年殖利率:{data.rate}</div>
      <div>當前股價:{data.price}</div>
      <div>現金股利:{data.dCash}</div>
      <div>去年殖利率:{data.rateLY}</div>
      <div>前五年平均殖利率:{data.rateAvg5}</div>
      <div>前十年平均殖利率:{data.rateAvg10}</div>
      <div>去年除息股價:{data.priceLY}</div>
      <div>去年除息日:{data.dDateLY}</div>
      <div>去年填滿息日:{data.dFDayLY}</div>
      {/* <div>前年低點:{data.lowLY}</div>
      <div>去年高點:{data.HighLY}</div> */}
    </div>
  );
}

export default MainContent;
