import React, { useEffect, useState, useMemo, useContext } from "react";
import { formatDate, tryParseFloat } from "../utility/formatHelper";
import { dataAPI } from "../utility/config";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Context from "../store/context";
import { GET_SCHEDULE_SUCCESS } from "../store/actions/actionType";

function DividendSchedule(props) {
  const { schedule, dispatch } = useContext(Context);
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    if (schedule.length == 0) {
      fetch(`${dataAPI}/stock/scheudle`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          dispatch({ type: GET_SCHEDULE_SUCCESS, payload: data.data });
        });
    }
  }, []);

  const table = useMemo(
    () => (
      <MaterialTable
        {...getTableProps()}
        data={schedule.filter((x) =>
          filter ? tryParseFloat(x.rate) > 5 : true
        )}
      />
    ),
    [filter, schedule]
  );

  if (schedule.length == 0) {
    return <div>Loading...</div>;
  }

  console.log("Schedule render");
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
      {table}
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
