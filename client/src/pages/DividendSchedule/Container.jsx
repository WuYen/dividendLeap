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

export default function DividendSchedule(props) {
  const [{ type }] = useRouter();
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const { schedule, filter } = useSelector(({ schedule }) => schedule);
  const [loading, setLoading] = useState(true);
  const [typeList, setTypeList] = useState([
    { label: "除權息預告", url: "" },
    { label: "高殖利率", url: "/高殖利率" },
  ]);
  const dispatch = useDispatch();
  const url = typeList.find((x) => x.label == type)?.url || "";

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
    api.get("/schedule" + url + "?menu=true").then((res) => {
      console.log("GET_SCHEDULE_SUCCESS data", res);
      const { success, data } = res;
      if (success) {
        handleGetScheduleSuccess(data.list);

        setTypeList((x) => {
          let temp = [];
          data.menu.forEach((d) => {
            d !== "twse" && temp.push({ label: d, url: "/" + d });
          });
          return [...x, ...temp];
        });
      }
    });
  }, []);

  const filtedData = filter && url == "" ? schedule.filter((x) => tryParseFloat(x.rate) > 5) : schedule;
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
