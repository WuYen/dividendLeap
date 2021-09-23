import React, { useCallback, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import api from "../../utils/api";

import List from "./List.v2";
import Form from "./Form.v2";

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
  return api.get(`/schedule/list`).then((data) => {
    console.log("fetchList result", data);
    return data;
  });
}

function removeData(id) {
  const payload = JSON.stringify({ id: id });
  return api.post(`/schedule/remove`, payload).then((data) => data);
}

function saveData(data) {
  const isAdd = !data.id;
  const payload = JSON.stringify(data);
  const url = `/schedule/${isAdd ? "insert" : "update"}`;
  return api.post(url, payload).then((data) => {
    console.log("saveData result", data);
    return data;
  });
}
