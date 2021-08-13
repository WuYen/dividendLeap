import React, { useCallback, useState } from "react";
import {
  SimpleGrid,
  Box,
  Center,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";
import api from "../../utility/api";
import { toDateString } from "../../utility/formatHelper";

import MoreButton from "./MoreButton";
import DataGroup from "./DataGroup";
import KeyWord from "./KeyWord";

export default function News(props) {
  const [queryDate, setQueryDate] = useState(getLastNDay(4));
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const loadMore = useCallback(() => {
    console.log("load more click");
    setQueryDate((x) => {
      return getLastNDay(x.length + 4);
    });
  }, []);

  return (
    <Box p="4" width="100%">
      <Box>
        <KeyWord text="現金股利" />
      </Box>
      <SimpleGrid columns={over768px ? 4 : 1} spacing={10}>
        {queryDate.map((d, i) => {
          return <DataGroup key={i} date={d} fetchData={fetchData} />;
        })}
      </SimpleGrid>
      <Divider paddingTop="4" />
      <Center paddingTop="4">
        <MoreButton showMore={true} onClick={loadMore} />
      </Center>
    </Box>
  );
}

function getLastNDay(n) {
  const today = new Date();

  let result = [toDateString(today)];
  for (let i = 1; i < n; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    result.push(toDateString(d));
  }
  return result;
}

function fetchData(date) {
  return api.get(`/news/${date}`).then((data) => {
    console.log("fetchData result", data);
    return data;
  });
}
