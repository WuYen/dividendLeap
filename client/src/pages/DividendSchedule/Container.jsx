import React, { useEffect, useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { Box } from "@chakra-ui/react";
import { tryParseFloat } from "../../utils/formatHelper";
import Loading from "../../components/Loading";
import api from "../../utils/api";
import { getScheduleSuccess, toggleFilter } from "../../store/Dividend/action";
import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";
import useRouter from "../../hooks/useRouter";

function DividendSchedule(props) {
  const { getScheduleSuccess, toggleFilter, schedule, filter } = props;
  const [{ type }, history] = useRouter();
  const [loading, setLoading] = useState(true);
  const [typeList, setTypeList] = useState([]);
  const typeRef = useRef("");

  const handleGetScheduleSuccess = useCallback((data) => {
    getScheduleSuccess(data);
    setLoading(false);
  }, []);

  const handleUpdatePath = useCallback(
    (label) => {
      history.push(`/schedule?type=${label}`);
    },
    [history]
  );

  useEffect(() => {
    const search = typeList.length == 0 ? "?menu=true" : "";
    const url = (typeList.find((x) => x.label == type)?.url || "") + search;
    if (type != typeRef.current) {
      api.get("/schedule" + url).then(({ success, data }) => {
        console.log("schedule data", success, data);
        if (success) {
          handleGetScheduleSuccess(data.list);
          data.menu && setTypeList(data.menu.map((d) => ({ label: d, url: "/" + d })));
          typeRef.current == "" && handleUpdatePath(data.type);
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
          <ScheduleTable filtedData={filtedData} filter={filter} type={type} />
        </>
      )}
    </Box>
  );
}

const mapStateToProps = ({ schedule }) => ({ ...schedule });
const mapActionToProps = { getScheduleSuccess, toggleFilter };
export default connect(mapStateToProps, mapActionToProps)(DividendSchedule);
