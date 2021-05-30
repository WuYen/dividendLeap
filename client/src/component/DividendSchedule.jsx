import React, { useEffect, useState, useMemo } from "react";
import { helper } from "../utility";
import { dataAPI } from "../utility/config";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

function MainContent(props) {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch(`${dataAPI}/v2/stock/scheudle`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setSchedule(data.data);
      });
  }, []);

  const tableProps = useMemo(() => getTableProps(), []);

  if (schedule.length == 0) {
    return <div>Loading...</div>;
  }

  return <MaterialTable {...tableProps} data={schedule} />;
}

//"stockNo":"1702","stockName":"南僑","year":"2021","date":"20210601","cashDividen":2
function getTableProps() {
  return {
    // title: <Link to="/">Hello Stock</Link>,
    columns: [
      {
        title: "股票",
        field: "stockNo",
        render: (props) => {
          return (
            <Link
              to={{
                pathname: `/v2/detail/${props.stockNo}/${props.stockName}`,
              }}
            >
              {`${props.stockName}(${props.stockNo})`}
            </Link>
          );
        },
      },
      {
        title: "除息日",
        field: "date",
        render: (props) => {
          return (
            props.date.substr(0, 4) +
            "-" +
            props.date.substr(4, 2) +
            "-" +
            props.date.substr(6, 2)
          );
        },
      },
      {
        title: "現金股利",
        field: "cashDividen",
        render: (props) => {
          return (+props.cashDividen).toFixed(2);
        },
      },
    ],

    options: {
      search: false,
      paging: false,
      showTitle: false,
      toolbar: false,
    },
    localization: {
      header: {
        actions: "詳細資訊",
      },
    },
  };
}

export default MainContent;
