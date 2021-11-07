import React, { useEffect, useCallback } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

import { tryParseFloat } from "../../utils/formatHelper";
import Loading from "../../components/Loading";
import api from "../../utils/api";

import { getScheduleSuccess, toggleFilter } from "../../store/Dividend/action";
import { useSelector, useDispatch } from "react-redux";

import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";
import useRouter from "../../hooks/useRouter";

export default function DividendSchedule(props) {
  const [{ history }] = useRouter();
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const { schedule, filter } = useSelector(({ schedule }) => schedule);
  const dispatch = useDispatch();

  const handleGetScheduleSuccess = useCallback(
    (data) => {
      dispatch(getScheduleSuccess(data));
    },
    [dispatch]
  );

  const handleToggleFilter = useCallback(() => {
    dispatch(toggleFilter());
  }, [dispatch]);

  useEffect(() => {
    api.get("/schedule" + (history ? "/2021" : "")).then((data) => {
      console.log("GET_SCHEDULE_SUCCESS data", data);
      if (data.success) handleGetScheduleSuccess(data.data);
    });
  }, []);

  if (schedule.length === 0) {
    return <Loading />;
  }

  const filtedData = filter ? schedule.filter((x) => tryParseFloat(x.rate) > 5) : schedule;

  return (
    <Box w="100%">
      <ControlPanel
        filter={filter}
        count={filtedData.length}
        toggleFilter={handleToggleFilter}
        getScheduleSuccess={handleGetScheduleSuccess}
      />
      <ScheduleTable filtedData={filtedData} filter={filter} variant={over768px ? "md" : "sm"} />
    </Box>
  );
}
