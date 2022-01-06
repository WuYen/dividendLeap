import React, { useEffect, useCallback, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@chakra-ui/react";
import { tryParseFloat } from "../../utils/formatHelper";
import Loading from "../../components/Loading";
import api from "../../utils/api";
import { getScheduleSuccess, toggleFilter } from "../../store/Dividend/action";
import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";
import useRouter from "../../hooks/useRouter";

export default function DividendSchedule(props) {
  const [{ type }] = useRouter();
  const { schedule, filter } = useSelector(({ schedule }) => schedule);
  const [loading, setLoading] = useState(true);
  const [typeList, setTypeList] = useState([]);
  // { label: "除權息預告", url: "" },
  // { label: "高殖利率", url: "/高殖利率" },
  // { label: "排行榜", url: "/排行榜" },
  const isFirst = useRef(true);
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

  const handleSetTypeList = useCallback(
    (data) => {
      setTypeList((x) => {
        let temp = data
          .filter((y) => y !== "twse")
          .map((d) => {
            if (d === "除權息預告") {
              return { label: d, url: "" };
            }
            return { label: d, url: "/" + d };
          });
        return [...x, ...temp];
      });
    },
    [setTypeList]
  );

  useEffect(() => {
    const search = isFirst.current ? "?menu=true" : "";
    const url = (typeList.find((x) => x.label == type)?.url || "") + search;
    api.get("/schedule" + url).then(({ success, data }) => {
      console.log("schedule data", success, data);
      if (success) {
        handleGetScheduleSuccess(data.list);
        data.menu && handleSetTypeList(data.menu);
        isFirst.current = false;
      }
    });
  }, [type]);

  const filtedData = filter && type == "除權息預告" ? schedule.filter((x) => tryParseFloat(x.rate) > 5) : schedule;
  return (
    <Box w="100%">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ControlPanel
            filter={filter}
            count={filtedData.length}
            typeList={typeList}
            toggleFilter={handleToggleFilter}
            getScheduleSuccess={handleGetScheduleSuccess}
            onSetLoading={setLoading}
          />
          <ScheduleTable filtedData={filtedData} filter={filter} type={type} />
        </>
      )}
    </Box>
  );
}
