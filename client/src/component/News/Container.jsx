import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Center,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";
import { toDateString } from "../../utility/formatHelper";

import MoreButton from "./MoreButton";
import DataList from "./DataList";
import KeyWord from "./KeyWord";
import Socket from "../User/Socket";

export default function News(props) {
  const [queryDate, setQueryDate] = useState(getLastNDay(4));
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const loadMore = useCallback(() => {
    setQueryDate((x) => getLastNDay(x.length + 4));
  }, [setQueryDate]);

  return (
    <Box p="4" width="100%">
      <Box>
        <KeyWord text="現金股利" />
        <Socket>
          {(data) => {
            return data ? <DataList.List list={data} /> : <div>Empty</div>;
          }}
        </Socket>
      </Box>
      <SimpleGrid columns={over768px ? 4 : 1} spacing={10} marginTop="20px">
        {queryDate.map((d, i) => {
          return (
            <DataList.Container key={d} date={d} loading={0} list={1}>
              <DataList.Loading />
              <DataList.List />
            </DataList.Container>
          );
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
