import React, { useEffect, useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { Box, Grid } from "@chakra-ui/react";
import Loading from "../../components/Loading";
import { ScheduleAPI, tryParseFloat } from "../../utils";
import { getScheduleSuccess, toggleFilter } from "../../store/Dividend/action";
import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";
import { useRouter } from "../../hooks";
import ListView from "../MyStock/ListView";

function DividendSchedule(props) {
  const { getScheduleSuccess, toggleFilter, schedule, typeList, filter } = props;
  const [{ type = "" }, history] = useRouter();

  const [loading, setLoading] = useState(true);
  const typeRef = useRef(null);

  const handleGetScheduleSuccess = useCallback(({ list, menu }) => {
    let payload = {
      list,
      ...(menu && { menu: menu.map((d) => ({ label: d, url: "/" + d })) }),
    };
    getScheduleSuccess(payload);
    setLoading(false);
  }, []);

  const handleUpdatePath = useCallback(
    (label) => {
      history.push(`/schedule?type=${label}`);
    },
    [history]
  );

  useEffect(() => {
    if (type != typeRef.current || typeList.length == 0) {
      const search = typeList.length == 0 ? "?menu=true&v2=true" : "?v2=true";
      ScheduleAPI.getByType(type, search).then(({ success, data }) => {
        console.log("schedule data", success, data);
        if (success) {
          handleGetScheduleSuccess(data);
          handleUpdatePath(data.type);
          typeRef.current = data.type;
        }
      });
    }
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
            type={type}
            typeList={typeList}
            onSetLoading={setLoading}
            onToggleFilter={toggleFilter}
            onUpdatePath={handleUpdatePath}
            getScheduleSuccess={handleGetScheduleSuccess}
          />
          <Grid m="2" gridTemplateColumns="1fr" gridGap="4">
            {schedule.map((d) => (
              <ListView data={d} />
            ))}
          </Grid>
          {/* <ScheduleTable filtedData={filtedData} filter={filter} type={type} /> */}
        </>
      )}
    </Box>
  );
}

const mapStateToProps = ({ schedule }) => ({ ...schedule });
const mapActionToProps = {
  getScheduleSuccess,
  toggleFilter,
};
export default connect(mapStateToProps, mapActionToProps)(DividendSchedule);

const d = {
  meta: {
    no: 2451,
    nm: "創見",
    industry: "半導體",
    price: 71.7,
    priceDt: "2022/02/11 14:30",
  },
  dividend: {
    date: "2022-02-14",
    cash: 4,
    rate: 4,
  },
  info: [
    { key: "eps1", value: "276.74", text: "去年同期EPS" },
    { key: "eps2", value: "170.61", text: "去年全年EPS" },
    { key: "revenue", value: "125.06", text: "去年全年獲利" },
    { key: "yield5", value: "6.07", text: "5年平均殖利率" },
    { key: "yield10", value: "6.33", text: "10年平均殖利率" },
  ],
};
