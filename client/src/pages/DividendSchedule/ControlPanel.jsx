import React, { useState, useRef } from "react";
import { Switch, FormLabel, Button, Text, Flex, Spacer } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import api from "../../utils/api";
import auth from "../../utils/auth";
import useRouter from "../../hooks/useRouter";

export default function ControlPanel(props) {
  const { filter, toggleFilter, getScheduleSuccess, count } = props;

  return (
    <Flex alignItems="center" p={4}>
      <Switch id="filter" colorScheme="teal" isChecked={filter} onChange={toggleFilter} />
      <FormLabel htmlFor="filter" mb="0">
        殖利率大於 5%
      </FormLabel>
      <SwitchButton getScheduleSuccess={getScheduleSuccess} enable={true} />
      <RefreshButton getScheduleSuccess={getScheduleSuccess} enable={false} />
      <Spacer />
      <Text>筆數: {count}</Text>
    </Flex>
  );
}
function SwitchButton(props) {
  const [, history] = useRouter();
  const [loading, setLoading] = useState(false);
  const toggle = useRef(true);
  return (
    props.enable &&
    auth.isLogin && (
      <Button
        isLoading={loading}
        loadingText="切換列表"
        colorScheme="teal"
        variant="outline"
        size="sm"
        spinnerPlacement="end"
        rightIcon={<RepeatIcon />}
        _focus={{ outline: "none" }}
        onClick={() => {
          setLoading(true);
          api
            .get("/schedule" + (toggle.current ? "/2021" : ""))
            .then((res) => {
              console.log("result", res);
              props.getScheduleSuccess(res.data);
              setLoading(false);
            })
            .then((x) => {
              let newPath = toggle.current ? "/schedule?history=true" : "/schedule";
              history.push(newPath);
              toggle.current = !toggle.current;
            });
        }}
      >
        切換列表
      </Button>
    )
  );
}

function RefreshButton(props) {
  const [loading, setLoading] = useState(false);
  return (
    props.enable &&
    auth.isLogin && (
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
              props.getScheduleSuccess(res.data);
              setLoading(false);
            });
        }}
      >
        刷新列表
      </Button>
    )
  );
}
