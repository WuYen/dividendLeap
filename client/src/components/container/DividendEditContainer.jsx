import React, { useCallback, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import { ScheduleAPI } from "../../utilities";

import List from "../dividendEdit/List.v2";
import Form from "../dividendEdit/Form.v2";

export default function DividendMaintain(props) {
  const [editItem, setEditItem] = useState();
  const [schedule, setSchedule] = useState(null);
  const handleFetchList = useCallback(
    () =>
      fetchList().then((res) => {
        setSchedule(res.data);
        return;
      }),
    []
  );
  const service = useMemo(() => {
    return {
      onFetchList: handleFetchList,
      onRemoveData: (id) => removeData(id).then(handleFetchList),
      onSaveData: (data) =>
        saveData(data)
          .then(handleFetchList)
          .then(() => {
            setEditItem(null);
          }),
      onSetEditItem: setEditItem,
    };
  }, []);

  return (
    <Box d="flex" w="100%">
      <Box w="50%" h="80vh" maxHeight="80vh" overflowY="auto" p="4">
        <List schedule={schedule} editItem={editItem} service={service} />
      </Box>
      <Box w="50%" p="4">
        <Form editItem={editItem} service={service} />
      </Box>
    </Box>
  );
}

function fetchList(props) {
  return ScheduleAPI.getList().then((data) => {
    console.log("fetchList result", data);
    return data;
  });
}

function removeData(id) {
  const payload = JSON.stringify({ id: id });
  return ScheduleAPI.remove(payload).then((data) => data);
}

function saveData(data) {
  const isAdd = !data.id;
  const payload = JSON.stringify(data);
  if (isAdd) {
    return ScheduleAPI.add(payload).then((data) => {
      console.log("add schedule result", data);
      return data;
    });
  } else {
    return ScheduleAPI.update(payload).then((data) => {
      console.log("update schedule result", data);
      return data;
    });
  }
}
