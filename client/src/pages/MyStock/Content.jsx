import React, { useCallback, useEffect, useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import DataList from "../../pages/News/DataList";
import api from "../../utils/api";

export default function Content(props) {
  const { stockNo } = props;
  return (
    <Box>
      {/* <DataList.Container keyWord={stockNo} search={true} loading={0} list={1}>
        <DataList.Loading />
        <DataList.List />
      </DataList.Container> */}

      <Forecast stockNo={stockNo} />
    </Box>
  );
}

function Forecast(props) {
  const stockNo = 2451;
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/forcast/${stockNo}`).then((response) => {
      console.log("data", response);
      if (response.success) {
        setData(response.data);
      }
    });
  }, [stockNo]);
  console.log("d", data);
  return data ? (
    <Box>
      <Box>
        今年預估:
        <Element data={data.data[0]} />
      </Box>
      <Box>
        去年:
        <Element data={data.data[1]} />
      </Box>
    </Box>
  ) : null;
}

function Element(props) {
  const { data } = props;
  const { cashDividend, estimateDividend, q, rate, totalEps } = data;

  return (
    <HStack spacing={3}>
      <EPS eps={totalEps} quarter={q} />
      <div>現金股利:{cashDividend ? cashDividend : estimateDividend}</div>
      <div>分配率:{rate}</div>
    </HStack>
  );
}

function EPS(props) {
  const { eps, quarter } = props;
  return (
    <div>
      EPS:{eps}
      <HStack>
        <div>Q1:{quarter[0].eps || ""}</div>
        <div>Q2:{quarter[2]?.eps || ""}</div>
        <div>Q3:{quarter[3]?.eps || ""}</div>
        <div>Q4:{quarter[4]?.eps || ""}</div>
      </HStack>
    </div>
  );
}
