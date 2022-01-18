import React, { useRef } from "react";
import { Box, Center, List, ListItem, Input } from "@chakra-ui/react";
import api, { ToolAPI } from "../../utils/api";
import Socket from "../../components/Socket";

export default function Page(props) {
  const inputRef = useRef();
  return (
    <Box p="4" width="100%">
      <Center paddingTop="4">
        <List spacing={3}>
          <ListItem>
            <button
              onClick={() => {
                ToolAPI.newSchedule();
              }}
            >
              Fetch New Schedule
            </button>
          </ListItem>
          <ListItem>
            <button
              onClick={() => {
                ToolAPI.updateDayInfo();
              }}
            >
              Get All Day Info
            </button>
          </ListItem>
          <ListItem>
            <button
              onClick={() => {
                ToolAPI.resetForecastData(inputRef.current.value);
              }}
            >
              <Input placeholder="股票代號" ref={inputRef} />
              Reset Data
            </button>
          </ListItem>
          <ListItem>
            <Socket />
          </ListItem>
        </List>
      </Center>
    </Box>
  );
}
