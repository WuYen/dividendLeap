import React, { useEffect, useContext, useCallback } from "react";
import { formatDate, tryParseFloat } from "../utility/formatHelper";
import { dataAPI } from "../utility/config";
import { Link } from "react-router-dom";
import Context from "../store/context";
import { GET_SCHEDULE_SUCCESS } from "../store/actions/actionType";
import {
  Switch,
  FormControl,
  FormLabel,
  Box,
  Spinner,
  Container,
} from "@chakra-ui/react";
import ScheduleTable from "./ScheduleTable";

function DividendSchedule(props) {
  const { schedule, filter, dispatch } = useContext(Context);

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

  const toggleFilter = useCallback(() => {
    dispatch({ type: "TOGGLE_FILTER" });
  }, []);

  if (schedule.length == 0) {
    return (
      <Container centerContent>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Container>
    );
  }

  console.log("Schedule render");
  return (
    <Box w="100%" p={4}>
      <FormControl display="flex" alignItems="center" p={4}>
        <Switch
          id="filter"
          colorScheme="teal"
          isChecked={filter}
          onChange={toggleFilter}
        />
        <FormLabel htmlFor="filter" mb="0">
          殖利率大於 5%
        </FormLabel>
      </FormControl>
      <ScheduleTable data={schedule} filter={filter} />
    </Box>
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
