import React, { useEffect, useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { Box } from "@chakra-ui/react";
import { tryParseFloat } from "../../utils/formatHelper";
import Loading from "../../components/Loading";
import { ScheduleAPI } from "../../utils/api";
import { getScheduleSuccess, toggleFilter } from "../../store/Dividend/action";
import ScheduleTable from "./ScheduleTable";
import ControlPanel from "./ControlPanel";
import useRouter from "../../hooks/useRouter";

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
