import React, { useState } from "react";
import { Switch, FormLabel, Button, Text, Flex, Spacer, Box } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { ToolAPI, ScheduleAPI, auth } from "../../utils";
import KeyWord from "../../components/KeyWord";

export default function ControlPanel(props) {
  const { typeList, filter, onToggleFilter, count, onSetLoading, type, onUpdatePath, version } = props;

  return (
    <>
      <Flex alignItems="center" p={4}>
        {typeList.map((item) => {
          const { label, url } = item;
          const isActive = label == type;
          return (
            <KeyWord
              key={label}
              text={label}
              active={isActive}
              onClick={() => {
                if (!isActive) {
                  onSetLoading(true);
                  onUpdatePath({ label, version });
                }
              }}
            />
          );
        })}
        <Spacer />
        <Text>筆數: {count}</Text>
      </Flex>
      <Flex alignItems="center" px={4}>
        <Switch
          id="dtype"
          colorScheme="teal"
          isChecked={version == "v2"}
          onChange={() => {
            onSetLoading(true);
            onUpdatePath({ label: type, version: version == "v1" ? "v2" : "v1" });
          }}
        />
        <FormLabel htmlFor="dtype" mb="0">
          切換顯示
        </FormLabel>
        <Box w="2"></Box>
        {type == "除權息預告" && (
          <>
            <Switch id="filter" colorScheme="teal" isChecked={filter} onChange={onToggleFilter} />
            <FormLabel htmlFor="filter" mb="0">
              殖利率大於 5%
            </FormLabel>
          </>
        )}
      </Flex>
    </>
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
          ToolAPI.newSchedule()
            .then((res) => {
              return ScheduleAPI.getSchedule();
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
