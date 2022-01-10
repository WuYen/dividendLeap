import React, { useEffect, useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { Box } from "@chakra-ui/react";
import { tryParseFloat } from "../../utils/formatHelper";
import Loading from "../../components/Loading";
import api from "../../utils/api";
import { getScheduleSuccess, toggleFilter } from "../../store/Dividend/action";
import * as ModalDialogAction from "../../store/ModalDialog/action";
import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";
import useRouter from "../../hooks/useRouter";
import useModal from "../../hooks/useModal";

function DividendSchedule(props) {
  const { getScheduleSuccess, toggleFilter, schedule, typeList, filter } = props;
  const [{ type = "" }, history] = useRouter();
  const { isOpen, showModal, hideModal } = useModal();

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
      const search = typeList.length == 0 ? "?menu=true" : "";
      const url = (`/schedule/${type}` || "") + search;
      api.get(url).then(({ success, data }) => {
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
          <button
            onClick={() => {
              showModal({
                title: "Test Title",
                content: <div>Model content</div>,
                footer: (
                  <button
                    onClick={() => {
                      hideModal();
                    }}
                  >
                    Close
                  </button>
                ),
              });
            }}
          >
            Show Modal
          </button>
          <ScheduleTable filtedData={filtedData} filter={filter} type={type} />
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
