import React, { useEffect, useState, useMemo } from "react";
import { formatDate, tryParseFloat } from "../utility/formatHelper";
import { dataAPI } from "../utility/config";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function DividendSchedule(props) {
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState(true);

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
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={filter}
            onChange={() => {
              setFilter((x) => !x);
            }}
            color="primary"
          />
        }
        label="殖利率大於 5%"
      />
      <MaterialTable
        {...tableProps}
        data={schedule.filter((x) => {
          if (filter) {
            return tryParseFloat(x.rate) > 5;
          }
          return true;
        })}
      />
    </>
  );
}

function getTableProps() {
  return {
    columns: [
      {
        title: "股票",
        field: "stockNo",
        render: (props) => {
          return (
            <Link
              to={{
                pathname: `/detail/${props.stockNo}/${props.stockName}`,
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
        render: (props) => formatDate(props.date),
      },
      {
        title: "現金股利",
        field: "cashDividen",
        render: (props) => {
          return (+props.cashDividen).toFixed(2);
        },
      },
      {
        title: "當前股價",
        field: "price",
        render: (props) => {
          if (props.price) {
            return (
              <div>
                <div style={{ display: "inline-block", minWidth: "55px" }}>
                  {props.price.toFixed(2)}
                </div>
                <div style={{ display: "inline-block" }}>{`(${formatDate(
                  props.priceDate
                )})`}</div>
              </div>
            );
          } else {
            return "--";
          }
        },
      },
      {
        title: "現金殖利率 %",
        field: "rate",
      },
    ],
    options: {
      search: false,
      paging: false,
      showTitle: false,
      toolbar: false,
    },
  };
}

export default DividendSchedule;
