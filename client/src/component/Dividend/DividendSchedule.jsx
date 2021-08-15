import React, { useEffect, useContext, useCallback } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

import Loading from "../Common/Loading";
import api from "../../utility/api";
import Context from "../../store/context";
import { GET_SCHEDULE_SUCCESS } from "../../store/actions/actionType";
import { tryParseFloat } from "../../utility/formatHelper";

import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";

export default function DividendSchedule(props) {
  const { schedule, filter, dispatch } = useContext(Context);
  const [over768px] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    api.get(`/stock/scheudle`).then((data) => {
      console.log("GET_SCHEDULE_SUCCESS data", data);
      dispatch({ type: GET_SCHEDULE_SUCCESS, payload: data.data });
    });
  }, []);

  const toggleFilter = useCallback(() => {
    dispatch({ type: "TOGGLE_FILTER" });
  }, [dispatch]);

  if (schedule.length === 0) {
    return <Loading />;
  }

  const filtedData = filter
    ? schedule.filter((x) => tryParseFloat(x.rate) > 5)
    : schedule;

  return (
    <Box w="100%">
      <ControlPanel
        filter={filter}
        count={filtedData.length}
        toggleFilter={toggleFilter}
      />
      <ScheduleTable
        filtedData={filtedData}
        filter={filter}
        variant={over768px ? "md" : "sm"}
      />
    </Box>
  );
}
