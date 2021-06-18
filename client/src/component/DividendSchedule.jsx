import React, { useEffect, useContext, useCallback } from "react";
import { formatDate, tryParseFloat } from "../utility/formatHelper";
import { dataAPI } from "../utility/config";
import { Link } from "react-router-dom";
import Context from "../store/context";
import { GET_SCHEDULE_SUCCESS } from "../store/actions/actionType";
import {
  Switch,
  FormControl,
  FormLabel,
  Box,
  Spinner,
  Container,
} from "@chakra-ui/react";
import ScheduleTable from "./ScheduleTable";

function DividendSchedule(props) {
  const { schedule, filter, dispatch } = useContext(Context);

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
  }, []);

  if (schedule.length == 0) {
    return (
      <Container centerContent>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Container>
    );
  }

  return (
    <Box w="100%" p={4}>
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
      </FormControl>
      <ScheduleTable data={schedule} filter={filter} />
    </Box>
  );
}

export default DividendSchedule;
