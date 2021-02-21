import React, { useEffect, useState, useMemo } from "react";
import { helper } from "../utility";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

function MainContent(props) {
  const [stockInfo, setStockInfo] = useState([]);
  const [stockDetail, updateStockDetail] = useState([]);
  const { sortAndFilter } = helper;

  useEffect(() => {
    fetch(`${helper.APIKey}/stock/info`)
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setStockInfo(data);
      });
  }, []);

  let displayData = sortAndFilter(stockInfo).map((x) => {
    const [date, stockNo, name] = x;
    let lastValue, avgValue, diffRatio;

    let detail = stockDetail.find((x) => x.key === stockNo);
    if (detail) {
      lastValue = detail.lastValue;
      avgValue = detail.avgValue;
      diffRatio = detail.diffRatio;
    }

    return {
      date,
      name: `${name}(${stockNo})`,
      stockNo,
      lastValue,
      avgValue,
      diffRatio,
    };
  });

  const tableProps = useMemo(() => getTableProps(updateStockDetail), []);
  return <MaterialTable {...tableProps} data={displayData} />;
}

function getTableProps(updateStockDetail) {
  return {
    title: "Hello Stock",
    columns: [
      {
        title: "股票",
        field: "name",
        render: (props) => {
          console.log("columns", props);
          return (
            <Link to={{ pathname: `/${props.stockNo}/detail` }}>
              {props.name}
            </Link>
          );
        },
      },
      { title: "除息日", field: "date" },
      { title: "前一天股價", field: "lastValue" },
      { title: "前一月股價", field: "avgValue" },
      { title: "差異%", field: "diffRatio" },
    ],
    actions: [
      {
        icon: "info",
        tooltip: "詳細資訊",
        onClick: (event, rowData) => {
          handelGetDetail(rowData.stockNo, updateStockDetail);
        },
      },
    ],
    options: {
      search: false,
      paging: false,
    },
    localization: {
      header: {
        actions: "詳細資訊",
      },
    },
  };
}

const handelGetDetail = async (stockNo, updateStockInfo) => {
  let promis1 = fetch(`${helper.APIKey}/stock/month/${stockNo}`);
  let promis2 = fetch(`${helper.APIKey}/stock/day/${helper.nowStr}/${stockNo}`);

  Promise.all([promis1, promis2]).then(async (values) => {
    let r1 = await values[0].json();
    let r2 = await values[1].json();
    let avg = r1[r1.length - 1];
    let lastTrade = r2[r2.length - 1];
    //diffRatio: (lastValue-avgValue)/lastValue*100
    updateStockInfo((x) => {
      const isExist = x.find((x) => x.key === stockNo);
      if (isExist) {
        return x;
      }

      let detail = {
        key: stockNo,
        avgMonth: avg[1],
        avgValue: avg[4],
        lastDay: lastTrade[0],
        lastValue: lastTrade[6],
        diffRatio: (((lastTrade[6] - avg[4]) / lastTrade[6]) * 100).toFixed(2),
      };

      return [...x, detail];
    });
  });
};

export default MainContent;
