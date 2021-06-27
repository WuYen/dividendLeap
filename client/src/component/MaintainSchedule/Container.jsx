import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import { dataAPI } from "../../utility/config";

import List from "./List.v2";
import Form from "./Form.v2";

function MaintainSchedule(props) {
  const [editItem, setEditItem] = useState();
  const [schedule, setSchedule] = useState(null);
  const service = useMemo(() => {
    const handleFetchList = () =>
      fetchList().then((res) => {
        setSchedule(res.data);
        return "Finish";
      });
    return {
      onFetchList: handleFetchList,
      onRemoveData: (id) => {
        removeData(id).then((res) => {
          return handleFetchList();
        });
      },
      onSaveData: (data) => {
        return saveData(data).then(() => {
          handleFetchList();
          setEditItem(null);
        });
      },
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
  return fetch(`${dataAPI}/schedule/list`)
    .then((res) => res.json())
    .then((data) => {
      console.log("fetchList result", data);
      return data;
    });
}

function removeData(props) {
  return fetch(`${dataAPI}/schedule/remove`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: props.id }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

function saveData(data) {
  const isAdd = !data.id;
  const payload = JSON.stringify(data);
  console.log(`saveData isAdd:${isAdd}`, payload);

  const url = `${dataAPI}/schedule/${isAdd ? "insert" : "update"}`;
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("saveData result", data);

      return data;
    });
}

export default MaintainSchedule;
