import React, { useEffect, useCallback, useState } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

import { tryParseFloat } from "../../utils/formatHelper";
import Loading from "../../components/Loading";
import api from "../../utils/api";

import { getScheduleSuccess, toggleFilter } from "../../store/Dividend/action";
import { useSelector, useDispatch } from "react-redux";

import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";
import useRouter from "../../hooks/useRouter";

const typeList = [
  { label: "除權息預告", url: "" },
  { label: "高殖利率", url: "/2021" },
]; // "0056成份"

export default function DividendSchedule(props) {
  const [{ type }] = useRouter();
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const { schedule, filter } = useSelector(({ schedule }) => schedule);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleGetScheduleSuccess = useCallback(
    (data) => {
      dispatch(getScheduleSuccess(data));
      setLoading(false);
    },
    [dispatch]
  );

  const handleToggleFilter = useCallback(() => {
    dispatch(toggleFilter());
  }, [dispatch]);

  useEffect(() => {
    const url = typeList.find((x) => x.label == type)?.url || "";

    api.get("/schedule" + url).then((data) => {
      console.log("GET_SCHEDULE_SUCCESS data", data);
      data.success && handleGetScheduleSuccess(data.data);
    });
  }, []);

  const filtedData = filter ? schedule.filter((x) => tryParseFloat(x.rate) > 5) : schedule;

  return (
    <Box w="100%">
      <ControlPanel
        filter={filter}
        count={filtedData.length}
        typeList={typeList}
        toggleFilter={handleToggleFilter}
        getScheduleSuccess={handleGetScheduleSuccess}
        onSetLoading={setLoading}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScheduleTable filtedData={filtedData} filter={filter} variant={over768px ? "md" : "sm"} />
      )}
    </Box>
  );
}
