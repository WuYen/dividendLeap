import React from "react";
import { Box } from "@chakra-ui/react";
import Loading from "../commons/Loading";
import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";

export default function Content(props) {
  const {
    loading,
    filter,
    filtedData,
    type,
    typeList,
    setLoading,
    toggleFilter,
    handleUpdatePath,
    handleGetScheduleSuccess,
  } = props;

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
