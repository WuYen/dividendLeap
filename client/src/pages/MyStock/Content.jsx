import React, { useCallback, useEffect, useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import DataList from "../../pages/News/DataList";
import api from "../../utils/api";
import { formatHelper } from "../../utils";

export default function Content(props) {
  const { stockNo } = props;
  return (
    <Box>
      <Forecast stockNo={stockNo} />
      {/* <DataList.Container keyWord={stockNo} search={true} loading={0} list={1}>
        <DataList.Loading />
        <DataList.List />
      </DataList.Container> */}
    </Box>
  );
}

function Forecast(props) {
  const { stockNo } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/forcast/${stockNo}`).then((response) => {
      console.log("data", response);
      if (response.success) {
        setData(response.data);
      }
    });
  }, [stockNo]);

  return data ? (
    <Box>
      <Box>
        {data.baseInfo[0]}-{data.baseInfo[1]}
      </Box>
      <Box>
        {data.dayInfo.price}({formatHelper.formatDate(data.dayInfo.date)})
      </Box>
      {data.eps.map((d, index) => (
        <Box key={index}>
          {d.year}:
          <Element data={d} />
        </Box>
      ))}
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
        <div>Q2:{quarter[1]?.eps || ""}</div>
        <div>Q3:{quarter[2]?.eps || ""}</div>
        <div>Q4:{quarter[3]?.eps || ""}</div>
      </HStack>
    </div>
  );
}
