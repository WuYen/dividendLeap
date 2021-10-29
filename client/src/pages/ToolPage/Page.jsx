import React from "react";
import { Box, Center, List, ListItem } from "@chakra-ui/react";
import api from "../../utils/api";

export default function Page(props) {
  return (
    <Box p="4" width="100%">
      <Center paddingTop="4">
        <List spacing={3}>
          <ListItem>
            <button
              onClick={() => {
                api.get("/tool/getNewSchedule");
              }}
            >
              Fetch New Schedule
            </button>
          </ListItem>
          <ListItem>
            <button
              onClick={() => {
                api.get("/tool/getAllDayInfo");
              }}
            >
              Get All Day Info
            </button>
          </ListItem>
        </List>
      </Center>
    </Box>
  );
}
