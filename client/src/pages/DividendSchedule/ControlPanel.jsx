import React, { useState } from "react";
import { Switch, FormLabel, Button, Text, Flex, Spacer } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import api from "../../utils/api";
import auth from "../../utils/auth";

export default function ControlPanel(props) {
  const { filter, toggleFilter, getScheduleSuccess, count } = props;

  const [loading, setLoading] = useState(false);
  return (
    <Flex alignItems="center" p={4}>
      <Switch id="filter" colorScheme="teal" isChecked={filter} onChange={toggleFilter} />
      <FormLabel htmlFor="filter" mb="0">
        殖利率大於 5%
      </FormLabel>
      {/* {auth.isLogin && (
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
              .get("/tool/getNewSchedule")
              .then((res) => {
                return api.get(`/schedule`);
              })
              .then((res) => {
                console.log("result", res);
                getScheduleSuccess(res.data);
                setLoading(false);
              });
          }}
        >
          刷新列表
        </Button>
      )} */}
      <Spacer />
      <Text>筆數: {count}</Text>
    </Flex>
  );
}
