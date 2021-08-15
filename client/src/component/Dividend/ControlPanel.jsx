import React, { useContext, useState } from "react";
import {
  Switch,
  FormLabel,
  Button,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import api from "../../utility/api";
import auth from "../../utility/auth";
import Context from "../../store/context";
import { GET_SCHEDULE_SUCCESS } from "../../store/actions/actionType";

export default function ControlPanel(props) {
  const { filter, toggleFilter, count } = props;
  const { dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  return (
    <Flex alignItems="center" p={4}>
      <Switch
        id="filter"
        colorScheme="teal"
        isChecked={filter}
        onChange={toggleFilter}
      />
      <FormLabel htmlFor="filter" mb="0">
        殖利率大於 5%
      </FormLabel>
      {auth.isLogin && (
        <Button
          isLoading={loading}
          loadingText="刷新列表"
          colorScheme="teal"
          variant="outline"
          size="sm"
          spinnerPlacement="end"
          rightIcon={<RepeatIcon />}
          _focus={{ outline: "none" }}
          onClick={() => {
            setLoading(true);
            api
              .get("/data/getNewSchedule")
              .then((res) => {
                return api.get(`/stock/scheudle`);
              })
              .then((res) => {
                console.log("result", res);
                dispatch({ type: GET_SCHEDULE_SUCCESS, payload: res.data });
                setLoading(false);
              });
          }}
        >
          刷新列表
        </Button>
      )}
      <Spacer />
      <Text>筆數: {count}</Text>
    </Flex>
  );
}
