import React, { useEffect, useContext, useCallback } from "react";
import { dataAPI } from "../../utility/config";
import Context from "../../store/context";
import { GET_SCHEDULE_SUCCESS } from "../../store/actions/actionType";
import {
  Switch,
  FormControl,
  FormLabel,
  Box,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import ScheduleTable from "./ScheduleTable";
import { RepeatIcon } from "@chakra-ui/icons";
import Loading from "../Common/Loading";

function DividendSchedule(props) {
  const { schedule, filter, dispatch } = useContext(Context);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetch(`${dataAPI}/stock/scheudle`)
      .then((res) => res.json())
      .then((data) => {
        console.log("GET_SCHEDULE_SUCCESS data", data);
        dispatch({ type: GET_SCHEDULE_SUCCESS, payload: data.data });
      });
  }, []);

  const toggleFilter = useCallback(() => {
    dispatch({ type: "TOGGLE_FILTER" });
  }, [dispatch]);

  if (schedule.length === 0) {
    return <Loading />;
  }

  return (
    <Box w="100%">
      <FormControl display="flex" alignItems="center" p={4}>
        <Switch
          id="filter"
          colorScheme="teal"
          isChecked={filter}
          onChange={toggleFilter}
        />
        <FormLabel htmlFor="filter" mb="0">
          殖利率大於 5%
        </FormLabel>

        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          rightIcon={<RepeatIcon />}
          onClick={() => {
            //call data api
          }}
        >
          刷新列表
        </Button>
      </FormControl>
      <ScheduleTable
        data={schedule}
        filter={filter}
        variant={isLargerThan768 ? "md" : "sm"}
      />
    </Box>
  );
}

export default DividendSchedule;
