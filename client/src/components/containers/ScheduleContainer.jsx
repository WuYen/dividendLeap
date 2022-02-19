import React, { useEffect, useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { Box, Grid } from "@chakra-ui/react";
import Loading from "../commons/Loading";
import { ScheduleAPI, tryParseFloat } from "../../utilities";
import { getScheduleSuccess, toggleFilter } from "../../stores/Dividend/action";
import ScheduleTable from "../schedule/ScheduleTable";
import ControlPanel from "../schedule/ControlPanel";
import { useRouter } from "../../hooks";
import ListView from "../stock/ListView";

function DividendSchedule(props) {
  const { getScheduleSuccess, toggleFilter, schedule, typeList, filter } = props;
  const [{ type = "", version = "v1" }, history] = useRouter();

  const [loading, setLoading] = useState(true);
  const typeRef = useRef(null);
  const versionRef = useRef(null);

  const handleGetScheduleSuccess = useCallback(({ list, menu }) => {
    let payload = {
      list,
      ...(menu && { menu: menu.map((d) => ({ label: d, url: "/" + d })) }),
    };
    getScheduleSuccess(payload);
    setLoading(false);
  }, []);

  const handleUpdatePath = useCallback(
    ({ label, version }) => {
      history.push(`/schedule?type=${label}&version=${version}`);
    },
    [history]
  );

  useEffect(() => {
    if (type != typeRef.current || version != versionRef.current || typeList.length == 0) {
      const search = typeList.length == 0 ? `?menu=true&version=${version}` : `?version=${version}`;
      ScheduleAPI.getByType(type, search).then(({ success, data }) => {
        console.log("schedule data", success, data);
        if (success) {
          handleGetScheduleSuccess(data);
          handleUpdatePath({ label: data.type, version });
          typeRef.current = data.type;
          versionRef.current = version;
        }
      });
    }
  }, [type, version]);

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
            version={version}
            typeList={typeList}
            onSetLoading={setLoading}
            onToggleFilter={toggleFilter}
            onUpdatePath={handleUpdatePath}
            getScheduleSuccess={handleGetScheduleSuccess}
          />
          {version == "v2" ? (
            <Grid m="2" gridTemplateColumns="1fr" gridGap="4">
              {schedule.map((d, index) => (
                <ListView key={index} data={d} />
              ))}
            </Grid>
          ) : (
            <ScheduleTable filtedData={filtedData} filter={filter} type={type} />
          )}
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
